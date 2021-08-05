import { Module } from '@nestjs/common';
import { Neo4jProvider } from './provider/neo4j-provider';

@Module({
  providers: [Neo4jProvider],
  exports: [Neo4jProvider],
})
export class Neo4jModule {}
