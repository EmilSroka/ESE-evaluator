import { Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { filter, first, pluck, map, reduce } from 'rxjs/operators';
import { Record as Record4j } from 'neo4j-driver';

type Translations = Record<string, string>;
type TagToTranslations = { string?: Translations };

const VARIABLE = 't';
function queryGenerator(tag: string): string {
  return `MATCH (${VARIABLE}:Translations)-[OF]->(Language { tag: "${tag}" })  RETURN ${VARIABLE}`;
}

@Injectable()
export class TranslationsService {
  private memo: ReplaySubject<TagToTranslations> = new ReplaySubject(1);

  constructor(private neo4j: Neo4jProvider) {
    this.memo.next({});
  }

  getByTag(tag: string): Observable<Record<string, string>> {
    this.update(tag);
    return this.memo
      .asObservable()
      .pipe(filter(hasTag(tag)), pluck(tag), first<Translations>());
  }

  private update(tag: string) {
    const request = this.neo4j
      .query(queryGenerator(tag))
      .pipe(map(extractProperties), reduce(insertToAccumulator, {}));

    const state = this.memo.pipe(first());

    forkJoin({ request, state }).subscribe(({ request, state }) => {
      this.memo.next({ ...state, [tag]: request });
    });
  }
}

function extractProperties(record: Record4j): Translations {
  return record.get(VARIABLE).properties;
}

function insertToAccumulator(
  acc: Translations,
  translations: Translations,
): Translations {
  return { ...acc, ...translations };
}

function hasTag(tag: string): <T>(memo: T) => boolean {
  return memo => memo[tag] != null;
}
