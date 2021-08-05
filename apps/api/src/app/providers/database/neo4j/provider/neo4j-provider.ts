import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Record } from 'neo4j-driver';

@Injectable()
export class Neo4jProvider {
  query(query: string): Observable<Record> {
    return new Observable();
  }
}
