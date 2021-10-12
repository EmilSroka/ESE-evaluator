import { Inject, Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../providers/database/neo4j/provider/neo4j-provider';
import { propsStringify } from '../../../utils/neo4j/props-stringify';
import {
  DatasetInfoDbModel,
  DatasetInfoDbWithOwnerModel,
  UserDbModel,
} from '@ese/api-interfaces';
import { ID_SERVICE, IdService } from '../../../shared/id/id-service.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const USER_VARIABLE = 'user';
const USER_TYPE = 'User';
const VARIABLE = 'dataset';
const DB_TYPE = 'Dataset';
const RELATION_NAME = 'ADDED_BY';

@Injectable()
export class DatasetGateway {
  constructor(
    @Inject(ID_SERVICE) private idService: IdService,
    private neo4j: Neo4jProvider,
  ) {}

  create(datasetInfo: DatasetInfoDbModel, owner: UserDbModel) {
    return this.neo4j
      .query(this.createQuery(datasetInfo, owner.email))
      .pipe(map(record => record.get(VARIABLE).properties));
  }

  getAll(): Observable<DatasetInfoDbWithOwnerModel> {
    return this.neo4j.query(this.getAllQuery()).pipe(
      map(record => ({
        ...record.get(VARIABLE).properties,
        username: record.get(USER_VARIABLE).properties.username,
      })),
    );
  }

  private createQuery(
    datasetInfo: DatasetInfoDbModel,
    userEmail: string,
  ): string {
    const asString = propsStringify(datasetInfo);
    return `
      MATCH (${USER_VARIABLE}:${USER_TYPE} { email: '${userEmail}' })
      CREATE (${VARIABLE}:${DB_TYPE} ${asString})-[:${RELATION_NAME}]->(${USER_VARIABLE})
      RETURN ${VARIABLE}
    `;
  }

  private getAllQuery(): string {
    return `
      MATCH (${VARIABLE}:${DB_TYPE})-[:${RELATION_NAME}]->(${USER_VARIABLE}:${USER_TYPE})
      RETURN ${VARIABLE}, ${USER_VARIABLE}
    `;
  }
}
