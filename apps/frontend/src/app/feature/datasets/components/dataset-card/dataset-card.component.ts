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
  @Input() displayUser = true;
  @Input() info?: DatasetInfoWithOwnerModel;
  @Output() interaction = new EventEmitter<DatasetInfoWithOwnerModel>();

  @HostListener('click')
  handleClick(): void {
    this.interaction.emit(this.info);
  }
}
