import { Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { LanguageObject } from '../../models/language.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class LanguageService {
  constructor(private _neo4j: Neo4jProvider) {}

  get(): Observable<LanguageObject[]> {
    return of([]);
  }
}
