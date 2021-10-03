import { Component } from '@angular/core';
import { MenuOptionsService } from './feature/navigation/service/menu-options.service';
import { NavigationService } from './feature/navigation/service/navigation.service';

@Component({
  selector: 'ese-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public menuOptionsService: MenuOptionsService,
    public navigation: NavigationService,
  ) {}

  click(action: undefined | (() => void)): void {
    this.navigation.close();
    action?.();
  }
}
