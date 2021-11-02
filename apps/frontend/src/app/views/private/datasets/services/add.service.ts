import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { DatasetAddDialogComponent } from '../../../../feature/datasets/layout/add/dataset-add-dialog.component';
import { filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { partition } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  DatasetsService,
  UploadDataset,
} from '../../../../feature/datasets/datasets.service';

const MODAL_WIDTH = '400px';

@Injectable()
export class AddDatasetService {
  previousUploadData?: UploadDataset;

  constructor(
    private datasetsService: DatasetsService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  add(): void {
    const dialogRef = this.dialog.open(DatasetAddDialogComponent, {
      width: MODAL_WIDTH,
      data: this.previousUploadData ?? {},
    });

    const close$ = dialogRef.afterClosed().pipe(
      filter(result => result != null),
      tap(data => (this.previousUploadData = data)),
      tap(() => this.displayStartMessage()),
      switchMap(data => this.datasetsService.upload(data)),
      shareReplay(1),
    );

    const [success$, failure$] = partition(
      close$,
      errors => errors.length === 0,
    );

    success$.subscribe(() => {
      this.displaySuccessMessage();
      this.previousUploadData = undefined;
    });

    failure$.subscribe(codes => {
      this.displayFailureMessage(codes);
    });
  }

  private displayStartMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_upload_dataset'),
      this.translate.instant('toast_ok'),
    );
  }

  private displaySuccessMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_upload_dataset_success'),
      this.translate.instant('toast_ok'),
    );
  }

  private displayFailureMessage(codes: string[]): void {
    const base = this.translate.instant('toast_upload_dataset_fail');
    const details = codes
      .map(code => `${code}_error`)
      .map(key => this.translate.instant(key));

    this.snackBar.open(
      `${base}: ${details.join(', ')}`,
      this.translate.instant('toast_ok'),
    );
  }
}
