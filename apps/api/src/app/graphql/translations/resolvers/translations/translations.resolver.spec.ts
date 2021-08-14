import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsResolver } from './translations.resolver';
import { Observable } from 'rxjs';
import { Language } from '../../models/language.model';
import { cold } from 'jest-marbles';
import { TranslationsService } from '../../../../feature/translation/services/translation/translations.service';

const TRANSLATIONS_MARBLE = '----(a|)';

describe('TranslationsResolver', () => {
  let languagesResolver: TranslationsResolver;
  let translationsService: TranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: TranslationsService, useClass: TranslationsServiceMock },
        TranslationsResolver,
      ],
    }).compile();

    languagesResolver = module.get(TranslationsResolver);
    translationsService = module.get(TranslationsService);
  });

  it('expose data from TranslationsService via translationsFor method for GraphQL', () => {
    expect(languagesResolver.translationsFor('TAG')).toBeObservable(
      cold(TRANSLATIONS_MARBLE),
    );
  });

  it('expect to throw error when translations not available', () => {
    expect.assertions(2);
    const noCallSpy = jest.fn();
    jest
      .spyOn(translationsService, 'getByTag')
      .mockReturnValue(cold(TRANSLATIONS_MARBLE, { a: {} }));
    languagesResolver.translationsFor('TAG').subscribe({
      next: noCallSpy,
      error: error => {
        expect(error.message).toMatchInlineSnapshot(
          `"Translations for TAG not found"`,
        );
        expect(noCallSpy).not.toHaveBeenCalled();
      },
      complete: noCallSpy,
    });
  });
});

class TranslationsServiceMock {
  getByTag(): Observable<Language> {
    return cold(TRANSLATIONS_MARBLE);
  }
}
