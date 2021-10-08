import { Test, TestingModule } from '@nestjs/testing';
import { TranslationsService } from './translations.service';
import { Neo4jProvider } from '../../../../providers/database/neo4j/provider/neo4j-provider';
import { Observable } from 'rxjs';
import { Record, Node } from 'neo4j-driver-core';
import { cold } from 'jest-marbles';
import * as faker from 'faker';

const MOCK_RESPONSE_MARBLE = ['----(abc|)', '--(ab|)'];
const RESULT_MARBLE = ['----(a|)', '------(a|)'];
const EMPTY_MARBLE = '----|';

describe('TranslationsService', () => {
  let translationsService: TranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: Neo4jProvider, useClass: Neo4jProviderMock },
        TranslationsService,
      ],
    }).compile();

    translationsService = module.get<TranslationsService>(TranslationsService);
  });

  it('get method should collect all available translations for given language tag and return them as a list of Languages', () => {
    const expected = cold(RESULT_MARBLE[0], { a: TRANSLATION_MERGE[0] });
    const result = translationsService.getByTag(`${TAG_NAME}0`);
    expect(result).toBeObservable(expected);
  });

  it('get method should memoize previous result', () => {
    expect.assertions(4);
    const memoTagName = `${TAG_NAME}0`;
    const newTagName = `${TAG_NAME}1`;
    translationsService.getByTag(memoTagName).subscribe({
      complete: () => {
        const memorizedResult = cold(RESULT_MARBLE[0], {
          a: TRANSLATION_MERGE[0],
        });
        const newResult = cold(RESULT_MARBLE[1], {
          a: TRANSLATION_MERGE[1],
        });
        expect(translationsService.getByTag(memoTagName)).toBeObservable(
          memorizedResult,
        );
        expect(translationsService.getByTag(newTagName)).toBeObservable(
          newResult,
        );
      },
    });
  });
});

const TRANSLATION_NODES = [
  [
    JSON.parse(faker.datatype.json()),
    JSON.parse(faker.datatype.json()),
    JSON.parse(faker.datatype.json()),
  ],
  [JSON.parse(faker.datatype.json()), JSON.parse(faker.datatype.json())],
];

const TRANSLATION_MERGE = TRANSLATION_NODES.map(nodes => {
  return {
    ...nodes.reduce((acc, el) => ({ ...acc, ...el }), {}),
  };
});

const WRONG_LANGUAGE_CODE = 'WRONG_LANGUAGE_CODE';
const TAG_NAME = 'TAG_NAME';

class Neo4jProviderMock {
  query(query: string): Observable<Record> {
    const [doQueryTranslations, key] = query.match(/\((.*):Translations/) ?? [];
    const [doQueryConnection] = query.match(/\[.*?OF.*?]/) ?? [];
    const [doQueryLanguages, languageCode] =
      query.match(/\(.*?Language.*?tag.?:\s*?"(.*?)".*?\)/) ?? [];

    if (languageCode === WRONG_LANGUAGE_CODE) return cold(EMPTY_MARBLE);
    if (!doQueryTranslations || !doQueryConnection || !doQueryLanguages)
      return cold(EMPTY_MARBLE);

    const [isTagName, id] = query.match(/TAG_NAME(\d*)/) ?? [];

    if (!isTagName) return cold(EMPTY_MARBLE);

    const idNumeric = Number(id);
    const nodes = TRANSLATION_NODES[idNumeric].map((json, idx) => {
      const node = new Node(idx, ['Translations'], json);
      return new Record([key], [node]);
    });
    const values = nodes
      .map<[Record, string]>((node, idx) => [
        node,
        String.fromCharCode('a'.charCodeAt(0) + idx),
      ])
      .reduce((acc, [node, key]) => ({ ...acc, [key]: node }), {});

    return cold(MOCK_RESPONSE_MARBLE[id], values);
  }

  onApplicationShutdown() {
    throw new Error(
      'Neo4jProvider onApplicationShutdown lifecycle method should not be call by TranslationsService',
    );
  }
}
