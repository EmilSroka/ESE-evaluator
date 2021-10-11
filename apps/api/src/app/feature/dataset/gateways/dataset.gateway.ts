import { Inject, Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../providers/database/neo4j/provider/neo4j-provider';
import { propsStringify } from '../../../utils/neo4j/props-stringify';
import { DatasetInfoDbModel } from '@ese/api-interfaces';
import { ID_SERVICE, IdService } from '../../../shared/id/id-service.interface';
import { map, tap } from 'rxjs/operators';

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

  create(datasetInfo: DatasetInfoDbModel, userEmail: string) {
    return this.neo4j.query(this.createQuery(datasetInfo, userEmail)).pipe(
      tap(console.log),
      map(record => record.get(VARIABLE).properties),
      tap(console.log),
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
}
