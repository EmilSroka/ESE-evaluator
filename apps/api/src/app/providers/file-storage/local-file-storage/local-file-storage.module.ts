import { DynamicModule, Module } from '@nestjs/common';
import { FILE_STORAGE } from '../file-storage';
import { LocalFileStorageService } from './local-file-storage.service';
import { ExceptionFactory } from '../../../feature/errors/exception.factory';

@Module({})
export class LocalFileStorageModule {
  static forRoot(path: string): DynamicModule {
    return {
      module: LocalFileStorageModule,
      providers: [
        {
          provide: FILE_STORAGE,
          useFactory: factory => {
            return new LocalFileStorageService(path, factory);
          },
          inject: [ExceptionFactory],
        },
      ],
      exports: [FILE_STORAGE],
    };
  }
}
