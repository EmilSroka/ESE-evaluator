import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';
import { DatasetsService } from '../../../datasets/datasets.service';

@Component({
  selector: 'ese-select-dataset-dialog',
  template: `
    <ese-datasets-list-layout
      [datasets]="datasets.datasets$"
      (interaction)="close($event)"
      [showIcons]="false"
    ></ese-datasets-list-layout>
  `,
})
export class SelectDatasetDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<
      SelectDatasetDialogComponent,
      DatasetInfoWithOwnerModel
    >,
    public datasets: DatasetsService,
  ) {}

  ngOnInit(): void {
    this.datasets.update();
  }

  close(dataset: DatasetInfoWithOwnerModel): void {
    this.dialogRef.close(dataset);
  }
}
