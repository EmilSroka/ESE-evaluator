import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { filter, map, tap } from 'rxjs/operators';
import { GET_TRANSLATIONS } from '../queries/languages.queries';

export function TranslateLoaderFactory(apollo: Apollo): GraphQLTranslateLoader {
  return new GraphQLTranslateLoader(apollo);
}

export class GraphQLTranslateLoader implements TranslateLoader {
  constructor(private apollo: Apollo) {}

  getTranslation(lang: string): Observable<any> {
    return this.apollo
      .query({
        query: GET_TRANSLATIONS,
        variables: {
          tag: lang,
        },
      })
      .pipe(
        tap(console.log),
        filter(({ loading }) => !loading),
        map(({ data }) => data),
      );
  }
}
