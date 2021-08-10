import { Module } from '@nestjs/common';
import { join } from 'path';
import { Neo4jModule } from './providers/database/neo4j/neo4j.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TranslationGQLModule } from './graphql/translations/translation.api.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/app/graphql/schema.gql'),
    }),
    Neo4jModule,
    TranslationGQLModule,
  ],
})
export class AppModule {}
