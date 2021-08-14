import { Args, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { TranslationsService } from '../../../../feature/translation/services/translation/translations.service';
import { NotFoundException } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { JSONObject } from '../../models/json.model';

@Resolver(of => JSONObject)
export class TranslationsResolver {
  constructor(private translations: TranslationsService) {}

  @Query(returns => JSONObject)
  translationsFor(
    @Args('tag') tag: string,
  ): Observable<Record<string, string>> {
    return this.translations.getByTag(tag).pipe(
      map(translations => {
        if (Object.keys(translations).length === 0)
          throw new NotFoundException(`Translations for ${tag} not found`);
        return translations;
      }),
    );
  }
}
