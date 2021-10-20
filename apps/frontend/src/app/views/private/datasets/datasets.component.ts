import { Component, OnInit } from '@angular/core';
import {
  DatasetsService,
  UploadDataset,
} from '../../../feature/datasets/datasets.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../../feature/user/user.service';
import { combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DatasetAddDialogComponent } from '../../../feature/datasets/layout/add/dataset-add-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

const MODAL_WIDTH = '400px';

@Component({
  selector: 'ese-datasets-view',
  templateUrl: 'datasets.component.html',
  styleUrls: ['datasets.component.scss'],
})
export class DatasetsComponent implements OnInit {
  previousUploadData?: UploadDataset;
  datasets$ = this.datasetsService.datasets$;
  myDatasets$ = combineLatest([this.datasets$, this.userService.get()]).pipe(
    map(([datasets, user]) => {
      return datasets.filter(({ username }) => username === user?.username);
    }),
  );

  constructor(
    private datasetsService: DatasetsService,
    private translate: TranslateService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.datasetsService.update();
  }

  add(): void {
    const dialogRef = this.dialog.open(DatasetAddDialogComponent, {
      width: MODAL_WIDTH,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(result => result != null),
        tap(data => (this.previousUploadData = data)),
        tap(() => this.displayUploadStartMessage()),
        switchMap(data => this.datasetsService.upload(data)),
      )
      .subscribe(isUploaded => {
        if (isUploaded) {
          this.displayUploadSuccessMessage();
          this.previousUploadData = undefined;
        } else {
          this.displayUploadFailureMessage();
        }
      });
  }

  private displayUploadStartMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_upload_dataset'),
      this.translate.instant('toast_ok'),
    );
  }

  private displayUploadSuccessMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_upload_dataset_success'),
      this.translate.instant('toast_ok'),
    );
  }

  private displayUploadFailureMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_upload_dataset_success'),
      this.translate.instant('toast_ok'),
    );
  }
}
