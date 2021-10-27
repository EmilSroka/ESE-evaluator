import {
  Component,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';

@Component({
  selector: 'ese-dataset-card',
  templateUrl: 'dataset-card.component.html',
  styleUrls: ['dataset-card.component.scss'],
})
export class DatasetCardComponent {
  @Input() info?: DatasetInfoWithOwnerModel;
  @Input() isEditable = false;
  @Input() displayUser = true;
  @Output() interaction = new EventEmitter<DatasetInfoWithOwnerModel>();
  @Output() edit = new EventEmitter<DatasetInfoWithOwnerModel>();

  @HostListener('click')
  handleClick(): void {
    this.interaction.emit(this.info);
  }
}
