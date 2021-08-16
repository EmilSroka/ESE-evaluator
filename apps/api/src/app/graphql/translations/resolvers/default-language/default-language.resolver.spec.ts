import { Test, TestingModule } from '@nestjs/testing';
import { DefaultLanguageResolver } from './default-language.resolver';
import { LanguageService } from '../../../../feature/translation/services/language/language.service';
import { Observable, of } from 'rxjs';
import { Language } from '../../models/language.model';
import { cold } from 'jest-marbles';
import {
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { DEFAULT_LANGUAGE_TOKEN } from './default-language.token';
import { catchError } from 'rxjs/operators';

const LANGUAGES_MARBLE = '---(a|)';
const ERROR_MARBLE = '---#';
const LANGUAGES_LIST = [{ tag: 'en' }, { tag: 'pl' }];

describe('DefaultLanguageResolver', () => {
  const OLD_ENV = process.env;

  let languagesResolver: DefaultLanguageResolver;
  let languageServiceMock: LanguageServiceMock;
  let loggerMock: LoggerMock;

  beforeEach(async () => {
    setup('en');
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('returns specified under DEFAULT_LANGUAGE_TOKEN language', async () => {
    const secondLanguage = LANGUAGES_LIST[1];
    await setup(secondLanguage.tag);
    jest
      .spyOn(languageServiceMock, 'get')
      .mockReturnValue(cold(LANGUAGES_MARBLE, { a: LANGUAGES_LIST }));
    const expected = cold(LANGUAGES_MARBLE, { a: secondLanguage });

    expect(languagesResolver.defaultLanguage()).toBeObservable(expected);
  });

  it('when DEFAULT_LANGUAGE_TOKEN is not on the list, returns first language from the list and log warn', async () => {
    await setup('NOT_ON_THE_LIST');
    jest
      .spyOn(languageServiceMock, 'get')
      .mockReturnValue(cold(LANGUAGES_MARBLE, { a: LANGUAGES_LIST }));
    const expected = cold(LANGUAGES_MARBLE, { a: LANGUAGES_LIST[0] });

    expect(languagesResolver.defaultLanguage()).toBeObservable(expected);
  });

  it('when language list is empty, throws InternalServerErrorException and log error', () => {
    expect.assertions(5);

    jest
      .spyOn(languageServiceMock, 'get')
      .mockReturnValue(cold(LANGUAGES_MARBLE, { a: [] }));

    expect(
      languagesResolver.defaultLanguage().pipe(
        catchError(error => {
          console.log(loggerMock.error.mock.calls[0]);
          expect(loggerMock.error).toBeCalledTimes(1);
          expect(loggerMock.error.mock.calls[0][0]).toMatchInlineSnapshot(
            `"DefaultLanguageResolver: Languages list returned from LanguageService is empty"`,
          );
          expect(error).toBeInstanceOf(InternalServerErrorException);
          throw error;
        }),
      ),
    ).toBeMarble(ERROR_MARBLE);
  });

  async function setup(defaultLanguage: string) {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: LanguageService, useClass: LanguageServiceMock },
        { provide: DEFAULT_LANGUAGE_TOKEN, useValue: defaultLanguage },
        { provide: Logger, useClass: LoggerMock },
        DefaultLanguageResolver,
      ],
    }).compile();

    languagesResolver = module.get<DefaultLanguageResolver>(
      DefaultLanguageResolver,
    );
    languageServiceMock = module.get(LanguageService);
    loggerMock = module.get(Logger);
  }
});

class LanguageServiceMock {
  get(): Observable<Language> {
    return of();
  }
}

class LoggerMock implements LoggerService {
  error;
  log;
  warn;

  constructor() {
    this.error = jest.fn();
    this.log = jest.fn();
    this.warn = jest.fn();
  }
}
