import { Inject, Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../providers/database/neo4j/provider/neo4j-provider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserCreate } from '../models/user.model';
import { ID_SERVICE, IdService } from '../services/id/id-service.interface';
import { propsStringify } from '../../../utils/neo4j/props-stringify';

const VARIABLE = 'user';
const DB_TYPE = 'User';

@Injectable()
export class UserGateway {
  constructor(
    @Inject(ID_SERVICE) private idService: IdService,
    private neo4j: Neo4jProvider,
  ) {}

  getByEmail(email: string): Observable<any> {
    return this.neo4j
      .query(this.selectQuery(email))
      .pipe(map(record => record.get(VARIABLE).properties));
  }

  create(data: UserCreate): Observable<any> {
    const id = this.idService.generate();
    const user = { ...data, id };
    return this.neo4j
      .query(this.createQuery(user))
      .pipe(map(record => record.get(VARIABLE).properties));
  }

  private createQuery(user: User): string {
    const asString = propsStringify(user);
    return `CREATE (${VARIABLE}:${DB_TYPE} ${asString}) RETURN ${VARIABLE}`;
  }

  private selectQuery(email: string): string {
    return `MATCH (${VARIABLE}:${DB_TYPE} { email: '${email}' }) RETURN ${VARIABLE}`;
  }
}
