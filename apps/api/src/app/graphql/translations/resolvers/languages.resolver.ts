import { Query, Resolver } from '@nestjs/graphql';
import { Language } from '../models/language.model';
import { LanguageService } from '../../../feature/translation/services/language/language.service';
import { Observable } from 'rxjs';

@Resolver(of => Language)
export class LanguagesResolver {
  constructor(private languages: LanguageService) {}

  @Query(returns => [Language])
  availableLanguages(): Observable<Language[]> {
    return this.languages.get();
  }
}
