import { Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { Record } from 'neo4j-driver';
import { LanguageObject } from '../../models/language.model';
import { Observable } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';
import { Language } from '@ese/api-interfaces';

const VARIABLE = 'l';
const PROPERTIES = ['englishName', 'tag', 'ownName'];
const QUERY = `MATCH (${VARIABLE}:Language) RETURN l`;

@Injectable()
export class LanguageService {
  constructor(private _neo4j: Neo4jProvider) {}

  get(): Observable<LanguageObject[]> {
    return this._neo4j.query(QUERY).pipe(
      map((record) => extractProperties(record)),
      filter((props) => hasAllProperties(props)),
      map((props) => toLanguageObject(props)),
      reduce(insertToAccumulator, []),
    );
  }
}

function extractProperties(record: Record): Language {
  return record.get(VARIABLE).properties;
}

function hasAllProperties(language: Partial<Language>): boolean {
  return (
    PROPERTIES.filter((prop) => language[prop] != null).length ===
    PROPERTIES.length
  );
}

function toLanguageObject(props: Language): LanguageObject {
  const language = new LanguageObject();
  for (const property of PROPERTIES) {
    language[property] = props[property];
  }
  return language;
}

function insertToAccumulator(
  acc: LanguageObject[],
  language: Language,
): LanguageObject[] {
  acc.push(language);
  return acc;
}
