import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';

const localStorage = window.localStorage;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  read<T>(key: string): Observable<T> {
    const result = localStorage.getItem(key);
    if (result == null) return EMPTY;
    return of(JSON.parse(result));
  }
}
