import { Component } from '@angular/core';
import { ConfigurationsService } from '../../../feature/configurations/configurations.service';

@Component({
  selector: 'ese-configurations-view',
  templateUrl: 'configurations.component.html',
  styleUrls: ['configurations.component.scss'],
})
export class ConfigurationsComponent {
  constructor(private config: ConfigurationsService) {}

  configs = this.config.configurations$;
}
