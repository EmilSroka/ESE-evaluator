import { Query, Resolver } from '@nestjs/graphql';
import { Language } from '../../models/language.model';
import { LanguageService } from '../../../../feature/translation/services/language/language.service';
import { Observable } from 'rxjs';
import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { DEFAULT_LANGUAGE_TOKEN } from './default-language.token';

@Resolver(of => Language)
export class DefaultLanguageResolver {
  constructor(
    @Inject(DEFAULT_LANGUAGE_TOKEN) private defaultLang: string,
    private languages: LanguageService,
    private logger: Logger,
  ) {}

  @Query(returns => Language)
  defaultLanguage(): Observable<Language> {
    return new Observable<Language>(subscriber => {
      this.languages.get().subscribe({
        next: languages => {
          if (languages.length === 0) {
            this.logger.error(
              'DefaultLanguageResolver: Languages list returned from LanguageService is empty',
            );
            subscriber.error(
              new InternalServerErrorException('Internal server error'),
            );
          } else if (!languages.find(({ tag }) => tag === this.defaultLang)) {
            this.logger.warn(
              `DefaultLanguageResolver: value '${this.defaultLang}' stored under DEFAULT_LANGUAGE_TOKEN is not present in languages list`,
            );
            subscriber.next(languages[0]);
            subscriber.complete();
          } else {
            subscriber.next(
              languages.find(({ tag }) => tag === this.defaultLang),
            );
            subscriber.complete();
          }
        },
      });
    });
  }
}
