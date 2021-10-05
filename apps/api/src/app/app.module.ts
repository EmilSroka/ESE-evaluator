import { Module } from '@nestjs/common';
import { join } from 'path';
import { Neo4jModule } from './providers/database/neo4j/neo4j.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlApiModule } from './graphql/gql.api.module';
import { AuthModule } from './feature/auth/auth.module';
import { CoreModule } from './core/core.module';
import { RestApiModule } from './rest/rest.api.module';

@Module({
  imports: [
    RestApiModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/app/graphql/schema.gql'),
    }),
    CoreModule,
    Neo4jModule,
    GqlApiModule,
    AuthModule,
  ],
})
export class AppModule {}
