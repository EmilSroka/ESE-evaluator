import { Module } from '@nestjs/common';
import { LanguageService } from './services/language/language.service';
import { Neo4jModule } from '../../providers/database/neo4j/neo4j.module';
import { TranslationsService } from './services/translation/translations.service';

@Module({
  imports: [Neo4jModule],
  providers: [LanguageService, TranslationsService],
  exports: [LanguageService, TranslationsService],
})
export class TranslationModule {}
