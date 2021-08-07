import { Test, TestingModule } from '@nestjs/testing';
import { LanguageService } from './language.service';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { Observable } from 'rxjs';
import { Record, Node } from 'neo4j-driver-core';
import { cold } from 'jest-marbles';
import { LanguageObject } from '../../models/language.model';

const MOCK_RESPONSE_MARBLE = '---(abc|)';
const RESULT_MARBLE = '---(a|)';
const EMPTY_MARBLE = '---|';

describe('LanguageService', () => {
  let languageService: LanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: Neo4jProvider, useClass: Neo4jProviderMock },
        LanguageService,
      ],
    }).compile();

    languageService = module.get<LanguageService>(LanguageService);
  });

  it('get method should collect all available languages with [tag, englishName, ownName] properties and return them as a list of LanguageObject', () => {
    const expected = cold(RESULT_MARBLE, {
      a: [ENGLISH_LANGUAGE_OBJECT, POLISH_LANGUAGE_OBJECT],
    });

    expect(languageService.get()).toBeObservable(expected);
  });

  it('get method should memoize previous result', (done) => {
    languageService.get().subscribe({
      complete: () => {
        const expected = cold(RESULT_MARBLE, {
          a: [ENGLISH_LANGUAGE_OBJECT, POLISH_LANGUAGE_OBJECT],
        });
        expect(languageService.get()).toBeObservable(expected);
        done();
      },
    });
  });
});

const ENGLISH_FIXTURE = {
  englishName: 'English',
  ownName: 'English',
  tag: 'en-US',
} as const;
const POLISH_FIXTURE = {
  englishName: 'Polish',
  ownName: 'polski',
  tag: 'pl',
} as const;
const FAIL_FIXTURE = {
  ownName: 'русский',
} as const;

const POLISH_LANGUAGE_OBJECT = new LanguageObject();
POLISH_LANGUAGE_OBJECT.tag = POLISH_FIXTURE.tag;
POLISH_LANGUAGE_OBJECT.englishName = POLISH_FIXTURE.englishName;
POLISH_LANGUAGE_OBJECT.ownName = POLISH_FIXTURE.ownName;

const ENGLISH_LANGUAGE_OBJECT = new LanguageObject();
ENGLISH_LANGUAGE_OBJECT.tag = ENGLISH_FIXTURE.tag;
ENGLISH_LANGUAGE_OBJECT.englishName = ENGLISH_FIXTURE.englishName;
ENGLISH_LANGUAGE_OBJECT.ownName = ENGLISH_FIXTURE.ownName;

class Neo4jProviderMock {
  query(query: string): Observable<Record> {
    const [isMatch, key] = query.match(/\((.*):Language/) ?? [];
    if (isMatch) {
      const en = new Node(1, ['Language'], ENGLISH_FIXTURE);
      const pl = new Node(2, ['Language'], POLISH_FIXTURE);
      const ru = new Node(3, ['Language'], FAIL_FIXTURE);
      return cold(MOCK_RESPONSE_MARBLE, {
        a: new Record([key], [en]),
        b: new Record([key], [pl]),
        c: new Record([key], [ru]),
      });
    }

    return cold(EMPTY_MARBLE);
  }

  onApplicationShutdown() {
    throw new Error(
      'Neo4jProvider onApplicationShutdown lifecycle method should not be call by LanguageService',
    );
  }
}
