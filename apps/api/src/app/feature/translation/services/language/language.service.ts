import { Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { Record } from 'neo4j-driver';
import { Language } from '../../../../graphql/translations/models/language.model';
import { Observable, ReplaySubject } from 'rxjs';
import { catchError, filter, first, map, reduce } from 'rxjs/operators';
import { LanguageModel } from '@ese/api-interfaces';

const VARIABLE = 'l';
const PROPERTIES = ['englishName', 'tag', 'ownName'];
const QUERY = `MATCH (${VARIABLE}:Language) RETURN l`;

@Injectable()
export class LanguageService {
  private memo: ReplaySubject<Language[]> = new ReplaySubject(1);

  constructor(private neo4j: Neo4jProvider) {}

  get(): Observable<Language[]> {
    this.update();
    return this.memo.asObservable().pipe(first());
  }

  private update(): void {
    this.neo4j
      .query(QUERY)
      .pipe(
        map(record => extractProperties(record)),
        filter(props => hasAllProperties(props)),
        map(props => toLanguageObject(props)),
        reduce(insertToAccumulator, []),
        catchError(() => []),
      )
      .subscribe(this.memo);
  }
}

function extractProperties(record: Record): LanguageModel {
  return record.get(VARIABLE).properties;
}

function hasAllProperties(language: Partial<LanguageModel>): boolean {
  return (
    PROPERTIES.filter(prop => language[prop] != null).length ===
    PROPERTIES.length
  );
}

function toLanguageObject(props: LanguageModel): Language {
  const language = new Language();
  for (const property of PROPERTIES) {
    language[property] = props[property];
  }
  return language;
}

function insertToAccumulator(
  acc: Language[],
  language: LanguageModel,
): Language[] {
  acc.push(language);
  return acc;
}
