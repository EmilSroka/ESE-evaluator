import { Module } from '@nestjs/common';
import { LanguageService } from './services/language/language.service';
import { Neo4jModule } from '../../providers/database/neo4j/neo4j.module';

@Module({
  imports: [Neo4jModule],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class TranslationModule {}
