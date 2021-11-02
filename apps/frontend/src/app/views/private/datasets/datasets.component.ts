import { Component, OnInit } from '@angular/core';
import { DatasetsService } from '../../../feature/datasets/datasets.service';
import { map } from 'rxjs/operators';
import { UserService } from '../../../feature/user/user.service';
import { combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownDialogComponent } from '../../../shared/markdown-dialog/markdown-dialog.component';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';
import { EditDatasetService } from './services/edit.service';
import { AddDatasetService } from './services/add.service';

const MODAL_WIDTH = '400px';

@Component({
  selector: 'ese-datasets-view',
  templateUrl: 'datasets.component.html',
  styleUrls: ['datasets.component.scss'],
})
export class DatasetsComponent implements OnInit {
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
    private dialog: MatDialog,
    private editService: EditDatasetService,
    private addService: AddDatasetService,
  ) {}

  ngOnInit(): void {
    this.datasetsService.update();
  }

  openHelpInfo(): void {
    this.dialog.open(MarkdownDialogComponent, {
      data: this.translate.instant('modal_dataset'),
      width: MODAL_WIDTH,
    });
  }

  edit(data: DatasetInfoWithOwnerModel) {
    this.editService.edit(data);
  }

  add() {
    this.addService.add();
  }
}
