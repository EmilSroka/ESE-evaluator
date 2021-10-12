import { Inject, Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../providers/database/neo4j/provider/neo4j-provider';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { propsStringify } from '../../../utils/neo4j/props-stringify';
import {
  UserBackendModel,
  UserDbModel,
  UserDbUpdateModel,
} from '@ese/api-interfaces';
import { propsUpdateStringify } from '../../../utils/neo4j/props-update-stringify';
import { ID_SERVICE, IdService } from '../../../shared/id/id-service.interface';

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
      .query(this.selectByEmailQuery(email))
      .pipe(map(record => record.get(VARIABLE).properties));
  }

  getByUsername(username: string): Observable<any> {
    return this.neo4j
      .query(this.selectByUsernameQuery(username))
      .pipe(map(record => record.get(VARIABLE).properties));
  }

  updateUser(email: string, props: UserDbUpdateModel): Observable<any> {
    return this.neo4j
      .query(this.updateQuery(email, props))
      .pipe(map(record => record.get(VARIABLE).properties));
  }

  create(data: UserBackendModel): Observable<any> {
    const id = this.idService.generate();
    const user = { ...data, id };
    return this.neo4j
      .query(this.createQuery(user))
      .pipe(map(record => record.get(VARIABLE).properties));
  }

  private updateQuery(email: string, props: UserDbUpdateModel): string {
    const asString = propsUpdateStringify(VARIABLE, props);
    return `MERGE (${VARIABLE}:${DB_TYPE} { email: '${email}'}) SET ${asString} RETURN ${VARIABLE}`;
  }

  private createQuery(user: UserDbModel): string {
    const asString = propsStringify(user);
    return `CREATE (${VARIABLE}:${DB_TYPE} ${asString}) RETURN ${VARIABLE}`;
  }

  private selectByEmailQuery(email: string): string {
    return `MATCH (${VARIABLE}:${DB_TYPE} { email: '${email}' }) RETURN ${VARIABLE}`;
  }

  private selectByUsernameQuery(username: string): string {
    return `MATCH (${VARIABLE}:${DB_TYPE} { username: '${username}' }) RETURN ${VARIABLE}`;
  }
}
