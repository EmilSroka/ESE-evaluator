import { ApolloQueryResult } from '@apollo/client';
import { TranslateLoader } from '@ngx-translate/core';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  GET_TRANSLATIONS,
  GetTranslationsResult,
} from '../queries/languages.queries';

export function TranslateLoaderFactory(apollo: Apollo): GraphQLTranslateLoader {
  return new GraphQLTranslateLoader(apollo);
}

export class GraphQLTranslateLoader implements TranslateLoader {
  constructor(private apollo: Apollo) {}

  getTranslation(lang: string): Observable<Record<string, string>> {
    return this.apollo
      .query<GetTranslationsResult>({
        query: GET_TRANSLATIONS,
        variables: {
          tag: lang,
        },
      })
      .pipe(filter(isNotLoading), map(extractTranslations));
  }
}

function isNotLoading(
  result: ApolloQueryResult<GetTranslationsResult>,
): boolean {
  return !result.loading;
}

function extractTranslations(
  result: ApolloQueryResult<GetTranslationsResult>,
): Record<string, string> {
  return result.data.translationsFor;
}
