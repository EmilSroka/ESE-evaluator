import {
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const BASE_URL = new InjectionToken<string>('Browser Storage');

@NgModule({
  imports: [HttpClientModule],
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    @Inject(BASE_URL) uri: string,
  ) {
    apollo.create({
      cache: new InMemoryCache(),
      link: httpLink.create({ uri }),
    });
  }

  static forRoot(baseUrl: string): ModuleWithProviders<GraphQLModule> {
    return {
      ngModule: GraphQLModule,
      providers: [
        {
          provide: BASE_URL,
          useValue: baseUrl,
        },
      ],
    };
  }
}
