import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CreateConfigService } from './services/create.service';
import { SeedsService } from './services/seeds.service';
import { ConfigGateway } from './gateways/config.gateway';
import { ConfigValidator } from './validator/config.validator';
import { IdModule } from '../../shared/id/id.module';
import { Neo4jModule } from '../../providers/database/neo4j/neo4j.module';
import { DatasetModule } from '../dataset/dataset.module';

const services = [
  CreateConfigService,
  SeedsService,
  ConfigGateway,
  ConfigValidator,
];

@Module({
  imports: [IdModule, Neo4jModule, DatasetModule],
  providers: [...services, ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
