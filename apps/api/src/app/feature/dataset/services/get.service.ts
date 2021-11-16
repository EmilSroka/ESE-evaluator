import { Inject, Injectable } from '@nestjs/common';
import { DatasetModel } from '@ese/api-interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  FILE_STORAGE,
  FileStorage,
} from '../../../providers/file-storage/file-storage';
import { AccessDatasetInfoService } from './list.service';

@Injectable()
export class AccessDatasetService {
  constructor(
    @Inject(FILE_STORAGE) private storage: FileStorage,
    private accessDatasetInfoService: AccessDatasetInfoService,
  ) {}

  getByName(name: string): Observable<DatasetModel> {
    return this.accessDatasetInfoService.getDbModelByName(name).pipe(
      switchMap(({ id }) => this.storage.read(`${id}.json`)),
      map(buffer => JSON.parse(buffer.toString())),
      catchError(() => of([])),
    );
  }
}
