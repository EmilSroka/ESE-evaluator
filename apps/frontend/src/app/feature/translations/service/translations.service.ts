import { Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LanguageModel } from '@ese/api-interfaces';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import {
  GET_AVAILABLE_LANGUAGES,
  GET_DEFAULT_LANGUAGE,
  GetAvailableLanguagesResult,
  GetDefaultLanguageResult,
} from '../queries/languages.queries';
import { TranslateService } from '@ngx-translate/core';
import { STORAGE_KEYS, StorageKeys } from '../../storage/storage.keys';
import { StorageService } from '../../storage/storage.service';

type Configuration = {
  defaultLanguage: string;
  languages: LanguageModel[];
};

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private state = new ReplaySubject<Configuration>(1);
  config = this.state.asObservable();

  constructor(
    @Inject(STORAGE_KEYS) private keys: StorageKeys,
    private storage: StorageService,
    private apollo: Apollo,
    private langService: TranslateService,
  ) {
    this.state.pipe(first()).subscribe({
      next: config => {
        this.langService.setDefaultLang(config.defaultLanguage);
        this.langService.use(config.defaultLanguage);
        this.langService.addLangs(config.languages.map(({ tag }) => tag));
      },
    });
  }

  init(): Observable<Configuration> {
    const defaultLanguageRequest = this.apollo
      .query<GetDefaultLanguageResult>({ query: GET_DEFAULT_LANGUAGE })
      .pipe(map(({ data }) => data.defaultLanguage.tag));
    const defaultValue$ = this.storage.readWithDefault<string>(
      this.keys.language,
      defaultLanguageRequest,
    );

    forkJoin({
      defaultLanguage: defaultValue$,
      languages: this.apollo
        .query<GetAvailableLanguagesResult>({ query: GET_AVAILABLE_LANGUAGES })
        .pipe(map(({ data }) => data.availableLanguages)),
    }).subscribe({
      next: value => this.state.next(value),
      error: error => this.state.error(error),
    });

    return this.state.asObservable().pipe(first());
  }

  use(tag: string) {
    this.langService.use(tag);
    this.storage.save(this.keys.language, tag);
  }
}

export function translationsInitializerFactory(service: TranslationsService) {
  return () => service.init();
}
