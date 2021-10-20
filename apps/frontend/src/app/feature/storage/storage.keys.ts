import { InjectionToken } from '@angular/core';

const KEYS = {
  language: 'language',
  theme: 'theme',
  token: 'token',
};
export const STORAGE_KEYS = new InjectionToken('STORAGE_KEYS', {
  providedIn: 'root',
  factory: () => KEYS,
});
export type StorageKeys = typeof KEYS;
