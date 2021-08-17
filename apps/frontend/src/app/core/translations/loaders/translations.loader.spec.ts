import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { TestBed } from '@angular/core/testing';
import { GraphQLTranslateLoader } from './translations.loader';
import { Apollo } from 'apollo-angular';
import { GET_TRANSLATIONS } from '../queries/languages.queries';
import * as faker from 'faker';

describe('GraphQLTranslateLoader', () => {
  let controller: ApolloTestingController;
  let loader: GraphQLTranslateLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });

    controller = TestBed.inject(ApolloTestingController);
    loader = new GraphQLTranslateLoader(TestBed.inject(Apollo));
  });

  afterEach(() => {
    controller.verify();
  });

  it('getTranslation method fetches translations for given language tag', done => {
    expect.assertions(2);

    const lang = 'en';
    const response = JSON.parse(faker.datatype.json());

    loader.getTranslation(lang).subscribe({
      next: value => {
        try {
          expect(value).toEqual(response);
          done();
        } catch (error) {
          done(error);
        }
      },
    });

    const op = controller.expectOne(GET_TRANSLATIONS);
    expect(op.operation.variables.tag).toEqual(lang);
    op.flush({
      data: {
        translationsFor: response,
      },
    });
  });
});
