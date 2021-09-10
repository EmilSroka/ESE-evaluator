import { TestBed } from '@angular/core/testing';
import {
  INITIAL_THEME,
  LIGHT_THEME_CLASS_NAME,
  Theme,
  ThemeService,
} from './theme.service';
import { STORAGE_KEYS } from '../../storage/storage.keys';
import { DOCUMENT } from '@angular/common';
import { StorageService } from '../../storage/storage.service';
import { Renderer2 } from '@angular/core';
import { cold } from 'jest-marbles';
import { EMPTY, of } from 'rxjs';

const initTheme = 'LIGHT';
const storageTheme = 'DARK';

describe('ThemeService', () => {
  let service: ThemeService;
  let storage: StorageService;
  let renderer: Renderer2;

  it(`add class .${LIGHT_THEME_CLASS_NAME} to body when white theme is set`, () => {
    setup(false);

    return Promise.resolve()
      .then(() => {
        expect(renderer.addClass).toHaveBeenCalledTimes(1);
        expect(renderer.addClass).toHaveBeenCalledWith(
          documentMock.body,
          LIGHT_THEME_CLASS_NAME,
        );
        service.setTheme(Theme.DARK);
      })
      .then(() => {
        expect(renderer.removeClass).toHaveBeenCalledTimes(1);
        expect(renderer.removeClass).toHaveBeenCalledWith(
          documentMock.body,
          LIGHT_THEME_CLASS_NAME,
        );
      });
  });

  it('saves value to storage', () => {
    const theme = Theme.DARK;
    setup(false);
    service.setTheme(theme);
    return new Promise<void>(resolve => {
      expect(storage.save).toHaveBeenCalledTimes(2);
      expect(storage.save).toHaveBeenNthCalledWith(
        1,
        storageKeysMock.theme,
        initTheme,
      );
      expect(storage.save).toHaveBeenNthCalledWith(
        2,
        storageKeysMock.theme,
        theme,
      );
      resolve();
    });
  });

  it('allows to access only current theme by exposing theme$ observable', () => {
    setup();
    service.setTheme(Theme.LIGHT);
    service.setTheme(Theme.DARK);
    expect(service.theme$).toBeObservable(cold('a', { a: 'DARK' }));
  });

  it('allows to change theme value by using setTheme method', () => {
    setup();
    service.setTheme(Theme.LIGHT);
    expect(service.theme$).toBeObservable(cold('a', { a: 'LIGHT' }));
  });

  it('loads initial value from storage', () => {
    setup();
    expect(service.theme$).toBeObservable(cold('a', { a: storageTheme }));
  });

  it('defaults theme to INITIAL_THEME if storage does not provide value', () => {
    setup(false);
    expect(service.theme$).toBeObservable(cold('a', { a: initTheme }));
  });

  function setup(isStorageSet: boolean = true) {
    const storageServiceMock = new StorageServiceMock();
    storageServiceMock.read.mockImplementation(
      isStorageSet ? () => of(storageTheme) : () => EMPTY,
    );
    TestBed.configureTestingModule({
      providers: [
        { provide: STORAGE_KEYS, useValue: storageKeysMock },
        { provide: DOCUMENT, useValue: documentMock },
        { provide: StorageService, useValue: storageServiceMock },
        { provide: Renderer2, useClass: Renderer2Mock },
        { provide: INITIAL_THEME, useValue: initTheme },
      ],
    });
    service = TestBed.inject(ThemeService);
    storage = TestBed.inject(StorageService);
    renderer = TestBed.inject(Renderer2);
  }
});

class StorageServiceMock {
  read = jest.fn();
  save = jest.fn();
}

class Renderer2Mock {
  addClass = jest.fn();
  removeClass = jest.fn();
}

const storageKeysMock = {
  theme: 'theme',
};

const documentMock = {
  body: Symbol('body'),
};
