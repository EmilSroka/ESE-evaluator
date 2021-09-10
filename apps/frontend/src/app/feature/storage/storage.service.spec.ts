import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import * as faker from 'faker';
import { cold } from 'jest-marbles';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
  });

  it('allows to save and retrieve data using key-value storage', () => {
    const value = faker.datatype.string();
    const key = faker.datatype.string();
    service.save(key, value);
    const returnValueSync = cold('(a|)', { a: value });
    expect(service.read(key)).toBeObservable(returnValueSync);
  });

  it('returns empty observable when requested for not used key', () => {
    const returnEmptySync = cold('|');
    expect(service.read('not-used-key')).toBeObservable(returnEmptySync);
  });
});
