import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesResolver } from './languages.resolver';
import { LanguageService } from '../../../../feature/translation/services/language/language.service';
import { Observable } from 'rxjs';
import { Language } from '../../models/language.model';
import { cold } from 'jest-marbles';

const LANGUAGE_MARBLE = '---(a|)';

describe('LanguageResolver', () => {
  let languagesResolver: LanguagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: LanguageService, useClass: LanguageServiceMock },
        LanguagesResolver,
      ],
    }).compile();

    languagesResolver = module.get<LanguagesResolver>(LanguagesResolver);
  });

  it('expose data from LanguageService via availableLanguages method for GraphQL', () => {
    const expected = cold(LANGUAGE_MARBLE);
    expect(languagesResolver.availableLanguages()).toBeObservable(expected);
  });
});

class LanguageServiceMock {
  get(): Observable<Language> {
    return cold(LANGUAGE_MARBLE);
  }
}
