import { Injectable } from '@nestjs/common';
import { FileStorage } from '../file-storage';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import { ExceptionFactory } from '../../../feature/errors/exception.factory';

@Injectable()
export class LocalFileStorageService implements FileStorage {
  constructor(
    private path: string,
    private exceptionFactory: ExceptionFactory,
  ) {}

  read(name: string): Observable<Buffer> {
    return new Observable<Buffer>(subscriber => {
      fs.readFile(`${this.path}/${name}`, {}, (err, content) => {
        if (err != null) {
          subscriber.error(
            this.exceptionFactory.internal({
              place: 'LocalFileStorageService#read',
              msg: 'Unable to find file',
              extra: `file name: "${name}"`,
            }),
          );
        } else {
          subscriber.next(content);
          subscriber.complete();
        }
      });
    });
  }

  save(name: string, content: Buffer): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      fs.writeFile(`${this.path}/${name}`, content, err => {
        subscriber.next(err == null);
        subscriber.complete();
      });
    });
  }
}
