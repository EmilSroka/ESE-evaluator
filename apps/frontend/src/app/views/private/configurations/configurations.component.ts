import { Component } from '@angular/core';
import { ConfigurationsService } from '../../../feature/configurations/configurations.service';
import { Router } from '@angular/router';
import { Path } from '../../../app-routing.module';
import { PrivatePath } from '../private-routes';

@Component({
  selector: 'ese-configurations-view',
  templateUrl: 'configurations.component.html',
  styleUrls: ['configurations.component.scss'],
})
export class ConfigurationsComponent {
  constructor(private config: ConfigurationsService, private router: Router) {}

  configs = this.config.configurations$;

  add(): void {
    this.router.navigateByUrl(
      `${Path.private}/${PrivatePath.addConfiguration}`,
    );
  }
}
