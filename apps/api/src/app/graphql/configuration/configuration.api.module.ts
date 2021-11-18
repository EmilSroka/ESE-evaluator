import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../feature/configuration/configuration.module';
import { ConfigurationResolver } from './configuration.resolver';

@Module({
  imports: [ConfigurationModule],
  providers: [ConfigurationResolver],
})
export class ConfigurationGqlApiModule {}
