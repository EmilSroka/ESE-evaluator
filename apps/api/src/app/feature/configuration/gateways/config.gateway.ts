import { Inject, Injectable } from '@nestjs/common';
import { Neo4jProvider } from '../../../providers/database/neo4j/provider/neo4j-provider';
import { propsStringify } from '../../../utils/neo4j/props-stringify';
import {
  AddConfigModel,
  BenchmarkData,
  ConfigInfoDbModel,
  ConfigModel,
} from '@ese/api-interfaces';
import { ID_SERVICE, IdService } from '../../../shared/id/id-service.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
const DATA_CONFIG_RELATION = 'USED_BY';
const DATASET_USER_RELATION = 'ADDED_BY';

@Injectable()
export class ConfigGateway {
  constructor(
    @Inject(ID_SERVICE) private idService: IdService,
    private neo4j: Neo4jProvider,
  ) {}

  getAll(): Observable<ConfigModel> {
    return this.neo4j.query(this.getAllQuery()).pipe(
      map(record => {
        const { id, ...props } = record.get(CONFIG_VARIABLE).properties;
        const { email, ...owner } = record.get(USER_VARIABLE).properties;
        const { username } = record.get(`${USER_VARIABLE}_2`).properties;
        return {
          ...props,
          owner,
          dataset: { ...record.get(DATASET_VARIABLE).properties, username },
        };
      }),
    );
  }

  create(datasetInfo: AddConfigModel & { id: string }, data: BenchmarkData) {
    const { ownerUsername, datasetName, ...metadata } = datasetInfo;

    return this.neo4j
      .query(this.createQuery(metadata, ownerUsername, datasetName, data))
      .pipe(map(record => record.get(CONFIG_VARIABLE).properties));
  }

  private getAllQuery(): string {
    return `
      MATCH (${CONFIG_VARIABLE}:${CONFIG_TYPE})-[:${CONFIG_USER_RELATION}]->(${USER_VARIABLE}:${USER_TYPE})
      OPTIONAL MATCH (${CONFIG_VARIABLE})-[:${CONFIG_DATASET_RELATION}]->(${DATASET_VARIABLE}:${DATASET_TYPE}),
      (${DATA_VARIABLE}:${DATA_TYPE})-[:${DATA_CONFIG_RELATION}]->(${CONFIG_VARIABLE}),
      (${DATASET_VARIABLE})-[:${DATASET_USER_RELATION}]->(${USER_VARIABLE}_2:${USER_TYPE})
      RETURN ${CONFIG_VARIABLE}, ${USER_VARIABLE}, ${DATASET_VARIABLE}, ${USER_VARIABLE}_2
    `;
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
