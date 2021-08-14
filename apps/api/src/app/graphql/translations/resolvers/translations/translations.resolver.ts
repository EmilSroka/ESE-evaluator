import { Args, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { TranslationsService } from '../../../../feature/translation/services/translation/translations.service';
import { NotFoundException } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { JSONObject } from '../../models/json.model';

@Resolver(of => JSONObject)
export class TranslationsResolver {
  constructor(private translations: TranslationsService) {}

  @Query(returns => JSONObject)
  translationsFor(
    @Args('tag') tag: string,
  ): Observable<Record<string, string>> {
    return this.translations
      .getByTag(tag)
      .pipe(handleNoTranslations(`Translations for ${tag} not found`));
  }
}

function handleNoTranslations(msg: string) {
  return source => {
    return source.pipe(
      tap(translations => {
        if (Object.keys(translations).length === 0)
          throw new NotFoundException(msg);
      }),
    );
  };
}
