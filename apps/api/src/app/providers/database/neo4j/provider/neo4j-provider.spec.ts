import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jProvider } from './neo4j-provider';
import { cold } from 'jest-marbles';
import * as faker from 'faker';
import { driver } from 'neo4j-driver';

const runMock = jest.fn();
const closeMock = jest.fn();
const rxSession = () => ({
  run: runMock,
  close: closeMock,
});
jest.mock('neo4j-driver', () => {
  const actual = jest.requireActual('neo4j-driver');

  return {
    ...actual,
    driver: jest.fn(() => ({
      rxSession: rxSession,
      close: closeMock,
    })),
  };
});

describe('Neo4jProvider', () => {
  let provider: Neo4jProvider;
  let module: TestingModule;

  beforeEach(async () => {
    jest.clearAllMocks();

    module = await Test.createTestingModule({
      providers: [Neo4jProvider],
    }).compile();

    provider = module.get<Neo4jProvider>(Neo4jProvider);
  });

  it('initializes neo4j driver', async () => {
    expect(driver).toHaveBeenCalledTimes(1);
  });
  it('allows to query using query method that returns observable', () => {
    const randomQuery = faker.datatype.string();
    const marble = '---a|';
    runMock.mockImplementationOnce(() => ({
      records: () => cold(marble),
    }));
    const expected = cold(marble);

    const response = provider.query(randomQuery);
    expect(response).toBeObservable(expected);
  });
  it('closes neo4j driver on application shutdown', async () => {
    await module.close();
    expect(closeMock).toHaveBeenCalledTimes(2);
  });
});
