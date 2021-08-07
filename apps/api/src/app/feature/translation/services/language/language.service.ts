import { Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { LanguageObject } from '../../models/language.model';
import { Observable } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';

const VARIABLE = 'l';
const PROPERTIES = ['englishName', 'tag', 'ownName'];
const QUERY = `MATCH (${VARIABLE}:Language) RETURN l`;

@Injectable()
export class LanguageService {
  constructor(private _neo4j: Neo4jProvider) {}

  get(): Observable<LanguageObject[]> {
    return this._neo4j.query(QUERY).pipe(
      map((record) => record.get(VARIABLE).properties),
      filter(
        (props) =>
          PROPERTIES.filter((prop) => props[prop] != null).length ===
          PROPERTIES.length
      ),
      map((props) => {
        const language = new LanguageObject();
        for (const property of PROPERTIES) {
          language[property] = props[property];
        }
        return language;
      }),
      reduce((acc, lang) => {
        acc.push(lang);
        return acc;
      }, [])
    );
  }
}
