import { Query, Resolver } from '@nestjs/graphql';
import { Language } from '../../models/language.model';
import { LanguageService } from '../../../../feature/translation/services/language/language.service';
import { Observable, of } from 'rxjs';

@Resolver(of => Language)
export class DefaultLanguageResolver {
  constructor(private languages: LanguageService) {}

  @Query(returns => Language)
  defaultLanguage(): Observable<Language> {
    return of();
  }
}
