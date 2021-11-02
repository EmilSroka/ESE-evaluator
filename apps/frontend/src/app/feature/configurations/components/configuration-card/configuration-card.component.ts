import {
  Component,
  HostListener,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { ConfigModel } from '@ese/api-interfaces';

@Component({
  selector: 'ese-configuration-card',
  templateUrl: 'configuration-card.component.html',
  styleUrls: ['configuration-card.component.scss'],
})
export class ConfigurationCardComponent {
  @Input() info?: ConfigModel;
  @Output() interaction = new EventEmitter<ConfigModel>();

  @HostListener('click')
  handleClick(): void {
    this.interaction.emit(this.info);
  }
}
