import { Observable } from 'rxjs';

export const FILE_STORAGE = 'FILE_STORAGE';

export interface FileStorage {
  save(name: string, content: Buffer): Observable<boolean>;
  read(name: string): Observable<Buffer>;
}
