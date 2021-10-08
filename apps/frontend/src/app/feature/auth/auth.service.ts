import { Inject, Injectable } from '@angular/core';
import { STORAGE_KEYS, StorageKeys } from '../storage/storage.keys';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(STORAGE_KEYS) private keys: StorageKeys,
    private storage: StorageService,
  ) {}

  setToken(token: string): void {
    this.storage.sessionSave(this.keys.token, token);
  }

  clearToken(): void {
    this.storage.delete(this.keys.token);
  }

  getToken(): Observable<string> {
    return this.storage.read<string>(this.keys.token);
  }

  isAuthenticated(): Observable<boolean> {
    return this.storage.read(this.keys.token).pipe(reduce(() => true, false));
  }
}
