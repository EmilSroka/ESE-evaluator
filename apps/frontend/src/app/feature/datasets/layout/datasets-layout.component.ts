import { Component, Input } from '@angular/core';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';

@Component({
  selector: 'ese-datasets-layout',
  templateUrl: 'datasets-layout.component.html',
  styleUrls: ['datasets-layout.component.scss'],
})
export class DatasetsLayoutComponent {
  @Input() data: DatasetInfoWithOwnerModel[] = [];

  get isEmpty(): boolean {
    return this.data.length === 0;
  }
}
