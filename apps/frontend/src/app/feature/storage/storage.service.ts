import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';

const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  sessionSave<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  read<T>(key: string): Observable<T> {
    const result = sessionStorage.getItem(key) ?? localStorage.getItem(key);
    if (result == null) return EMPTY;
    return of(JSON.parse(result));
  }

  readWithDefault<T>(key: string, whenEmpty: T | Observable<T>): Observable<T> {
    const result = sessionStorage.getItem(key) ?? localStorage.getItem(key);
    if (result != null) return of(JSON.parse(result));
    if (whenEmpty instanceof Observable) return whenEmpty;
    return of(whenEmpty);
  }

  delete<T>(key: string): Observable<T> {
    const value$ = this.read<T>(key);
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
    return value$;
  }
}
