import { Module } from '@nestjs/common';
import { DatasetValidator } from './validator/dataset.validator';
import { DatasetService } from './dataset.service';
import { DatasetGateway } from './gateways/dataset.gateway';
import { IdModule } from '../../shared/id/id.module';
import { Neo4jModule } from '../../providers/database/neo4j/neo4j.module';
import { CreateDatasetService } from './services/create.service';
import { DatasetInfoCache } from './services/cache.service';
import { ListDatasetInfoService } from './services/list.service';

@Module({
  imports: [IdModule, Neo4jModule],
  providers: [
    DatasetValidator,
    DatasetService,
    DatasetGateway,
    CreateDatasetService,
    DatasetInfoCache,
    ListDatasetInfoService,
  ],
  exports: [DatasetService],
})
export class DatasetModule {}
