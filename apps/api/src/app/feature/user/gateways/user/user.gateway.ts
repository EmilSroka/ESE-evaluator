import { Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const VARIABLE = 'user';

@Injectable()
export class UserGateway {
  constructor(private neo4j: Neo4jProvider) {}

  getByEmail(email: string): Observable<any> {
    return this.neo4j
      .query(this.createQuery(email))
      .pipe(map(record => record.get(VARIABLE).properties));
  }

  private createQuery(email: string): string {
    return `MATCH (${VARIABLE}:User { email: '${email}' }) RETURN ${VARIABLE}`;
  }
}
