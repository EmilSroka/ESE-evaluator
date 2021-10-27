import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { partition } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DatasetsService } from '../../../../feature/datasets/datasets.service';
import { UserService } from '../../../../feature/user/user.service';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';
import { DatasetEditDialogComponent } from '../../../../feature/datasets/layout/edit/dataset-edit-dialog.component';

const MODAL_WIDTH = '400px';

@Injectable()
export class EditDatasetService {
  constructor(
    private datasetsService: DatasetsService,
    private translate: TranslateService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  edit(dataset: DatasetInfoWithOwnerModel): void {
    const dialogRef = this.dialog.open(DatasetEditDialogComponent, {
      width: MODAL_WIDTH,
      data: dataset,
    });

    const close$ = dialogRef.afterClosed().pipe(
      filter(result => result != null),
      tap(() => this.displayStartMessage()),
      switchMap(data =>
        this.datasetsService.edit({ ...data, oldName: dataset.name }),
      ),
      shareReplay(1),
    );

    const [success$, failure$] = partition(
      close$,
      errors => errors.length === 0,
    );

    success$.subscribe(() => {
      this.displaySuccessMessage();
    });

    failure$.subscribe(codes => {
      this.displayFailureMessage(codes);
    });
  }

  private displayStartMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_edit_dataset'),
      this.translate.instant('toast_ok'),
    );
  }

  private displaySuccessMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_edit_dataset_success'),
      this.translate.instant('toast_ok'),
    );
  }

  private displayFailureMessage(codes: string[]): void {
    const base = this.translate.instant('toast_edit_dataset_fail');
    const details = codes
      .map(code => `${code}_error`)
      .map(key => this.translate.instant(key));

    this.snackBar.open(
      `${base}: ${details.join(', ')}`,
      this.translate.instant('toast_ok'),
    );
  }
}
