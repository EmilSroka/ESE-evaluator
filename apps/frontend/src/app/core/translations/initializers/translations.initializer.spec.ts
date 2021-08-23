import {
  TranslationsInitializerService,
  translationsInitializerFactory,
} from './translations.initializer';
import {
  ApolloTestingController,
  ApolloTestingModule,
  TestOperation,
} from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import {
  GET_AVAILABLE_LANGUAGES,
  GET_DEFAULT_LANGUAGE,
  GetAvailableLanguagesResult,
  GetDefaultLanguageResult,
} from '../queries/languages.queries';

describe('TranslationsInitializerService', () => {
  let controller: ApolloTestingController;
  let loader: TranslationsInitializerService;
  let translateServiceMock: TranslateService;

  let getDefaultLanguageQuery: TestOperation | null;
  let getAvailableLanguagesQuery: TestOperation | null;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        TranslationsInitializerService,
        { provide: TranslateService, useClass: TranslateServiceMock },
      ],
      imports: [ApolloTestingModule],
    });

    controller = TestBed.inject(ApolloTestingController);
    loader = TestBed.inject(TranslationsInitializerService);
    translateServiceMock = TestBed.inject(TranslateService);

    getDefaultLanguageQuery = null;
    getAvailableLanguagesQuery = null;
  });

  afterEach(() => {
    controller.verify();
  });

  it('init method fetches default language & languages list', () => {
    loader.init().subscribe();

    getDefaultLanguageQuery = controller.expectOne(GET_DEFAULT_LANGUAGE);
    getAvailableLanguagesQuery = controller.expectOne(GET_AVAILABLE_LANGUAGES);

    getDefaultLanguageQuery.flush({
      data: defaultLanguageFixture,
    });

    getAvailableLanguagesQuery.flush({
      data: availableLanguagesFixture,
    });
  });

  it('init method returns observable that completes on success', done => {
    loader.init().subscribe({
      complete: () => {
        done();
      },
    });

    getDefaultLanguageQuery = controller.expectOne(GET_DEFAULT_LANGUAGE);
    getDefaultLanguageQuery.flush({
      data: defaultLanguageFixture,
    });

    getAvailableLanguagesQuery = controller.expectOne(GET_AVAILABLE_LANGUAGES);
    getAvailableLanguagesQuery.flush({
      data: availableLanguagesFixture,
    });
  });

  it('init method returns observable that receive error when api fails', done => {
    loader.init().subscribe({
      error: () => {
        done();
      },
    });
    getDefaultLanguageQuery = controller.expectOne(GET_DEFAULT_LANGUAGE);
    getDefaultLanguageQuery.networkError(new Error(''));
    getAvailableLanguagesQuery = controller.expectOne(GET_AVAILABLE_LANGUAGES);
    getAvailableLanguagesQuery.networkError(new Error(''));
  });

  it('passes fetched data to TranslateService', done => {
    expect.assertions(4);
    loader.init().subscribe({
      complete: () => {
        try {
          expect(translateServiceMock.setDefaultLang).toHaveBeenCalledTimes(1);
          expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith(
            defaultLanguageFixture.defaultLanguage.tag,
          );

          expect(translateServiceMock.addLangs).toHaveBeenCalledTimes(1);
          expect(translateServiceMock.addLangs).toHaveBeenCalledWith(
            availableLanguagesFixture.availableLanguages.map(({ tag }) => tag),
          );
          done();
        } catch (error) {
          done(error);
        }
      },
    });

    getDefaultLanguageQuery = controller.expectOne(GET_DEFAULT_LANGUAGE);
    getDefaultLanguageQuery.flush({
      data: defaultLanguageFixture,
    });

    getAvailableLanguagesQuery = controller.expectOne(GET_AVAILABLE_LANGUAGES);
    getAvailableLanguagesQuery.flush({
      data: availableLanguagesFixture,
    });
  });
});

describe('translationsInitializerFactory', () => {
  it('is a APP_INITIALIZER factory that returns a function that calls init method on TranslationsInitializerService', () => {
    const fn = jest.fn();
    translationsInitializerFactory({ init: fn } as any)();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

class TranslateServiceMock {
  setDefaultLang = jest.fn();
  addLangs = jest.fn();
}

const defaultLanguageFixture: GetDefaultLanguageResult = {
  defaultLanguage: {
    tag: 'en',
  },
};

const availableLanguagesFixture: GetAvailableLanguagesResult = {
  availableLanguages: [
    {
      tag: 'en',
      ownName: 'English',
      englishName: 'English',
    },
    {
      tag: 'pl',
      ownName: 'polski',
      englishName: 'Polish',
    },
  ],
};
