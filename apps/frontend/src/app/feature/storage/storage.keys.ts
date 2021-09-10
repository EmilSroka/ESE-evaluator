import { InjectionToken } from '@angular/core';

const KEYS = {
  theme: 'theme',
};
export const STORAGE_KEYS = new InjectionToken('STORAGE_KEYS', {
  providedIn: 'root',
  factory: () => KEYS,
});
export type StorageKeys = typeof KEYS;
