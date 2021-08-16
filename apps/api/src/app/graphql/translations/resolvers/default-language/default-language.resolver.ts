import { Query, Resolver } from '@nestjs/graphql';
import { Language } from '../../models/language.model';
import { LanguageService } from '../../../../feature/translation/services/language/language.service';
import { Observable, Subscriber } from 'rxjs';
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
          if (isEmpty(languages)) {
            this.handleError(subscriber);
          } else if (isNotIn(languages, this.defaultLang)) {
            this.warnAndPushFirstFromLanguages(subscriber, languages);
          } else {
            this.pushDefaultValue(subscriber, languages);
          }
        },
      });
    });
  }

  handleError(subscriber: Subscriber<Language>): void {
    this.logger.error(
      'DefaultLanguageResolver: Languages list returned from LanguageService is empty',
    );
    subscriber.error(new InternalServerErrorException('Internal server error'));
  }

  warnAndPushFirstFromLanguages(
    subscriber: Subscriber<Language>,
    languages: Language[],
  ): void {
    this.logger.warn(
      `DefaultLanguageResolver: value '${this.defaultLang}' stored under DEFAULT_LANGUAGE_TOKEN is not present in languages list`,
    );
    subscriber.next(languages[0]);
    subscriber.complete();
  }

  pushDefaultValue(
    subscriber: Subscriber<Language>,
    languages: Language[],
  ): void {
    subscriber.next(languages.find(({ tag }) => tag === this.defaultLang));
    subscriber.complete();
  }
}

function isEmpty(languages: Language[]): boolean {
  return languages.length === 0;
}

function isNotIn(languages: Language[], target: string): boolean {
  return !languages.find(({ tag }) => tag === target);
}
