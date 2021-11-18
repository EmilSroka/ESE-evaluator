import { Inject, Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../providers/database/neo4j/provider/neo4j-provider';
import { propsStringify } from '../../../utils/neo4j/props-stringify';
import {
  AddConfigModel,
  BenchmarkData,
  ConfigInfoDbModel,
} from '@ese/api-interfaces';
import { ID_SERVICE, IdService } from '../../../shared/id/id-service.interface';
import { map } from 'rxjs/operators';

const USER_VARIABLE = 'user';
const USER_TYPE = 'User';
const DATASET_VARIABLE = 'dataset';
const DATASET_TYPE = 'Dataset';
const DATA_VARIABLE = 'data';
const DATA_TYPE = 'BenchmarkData';
const CONFIG_VARIABLE = 'config';
const CONFIG_TYPE = 'Configuration';
const CONFIG_DATASET_RELATION = 'USE';
const CONFIG_USER_RELATION = 'CREATED_BY';
const DATA_CONFIG_RELATION = 'OF';

@Injectable()
export class ConfigGateway {
  constructor(
    @Inject(ID_SERVICE) private idService: IdService,
    private neo4j: Neo4jProvider,
  ) {}

  create(datasetInfo: AddConfigModel & { id: string }, data: BenchmarkData) {
    const { ownerUsername, datasetName, ...metadata } = datasetInfo;

    return this.neo4j
      .query(this.createQuery(metadata, ownerUsername, datasetName, data))
      .pipe(map(record => record.get(CONFIG_VARIABLE).properties));
  }

  private createQuery(
    config: ConfigInfoDbModel,
    username: string,
    dataset: string,
    data: BenchmarkData,
  ): string {
    const configProps = propsStringify(config);
    const dataProps = propsStringify(data);

    return `
      MATCH (${USER_VARIABLE}:${USER_TYPE} { username: '${username}' })
      OPTIONAL MATCH (${DATASET_VARIABLE}:${DATASET_TYPE} { name: '${dataset}' })
      CREATE (${CONFIG_VARIABLE}:${CONFIG_TYPE} ${configProps})-[:${CONFIG_USER_RELATION}]->(${USER_VARIABLE}),
      (${CONFIG_VARIABLE})-[:${CONFIG_DATASET_RELATION}]->(${DATASET_VARIABLE}),
      (${DATA_VARIABLE}:${DATA_TYPE} ${dataProps})-[:${DATA_CONFIG_RELATION}]->(${CONFIG_VARIABLE})
      RETURN ${CONFIG_VARIABLE}
    `;
  }
}
