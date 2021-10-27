import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';

@Component({
  selector: 'ese-datasets-list-layout',
  templateUrl: 'datasets-list-layout.component.html',
  styleUrls: ['datasets-list-layout.component.scss'],
})
export class DatasetsListLayoutComponent {
  @Input() data: DatasetInfoWithOwnerModel[] = [];
  @Input() isEditable = false;
  @Output() edit = new EventEmitter<DatasetInfoWithOwnerModel>();

  get isEmpty(): boolean {
    return this.data.length === 0;
  }
}
