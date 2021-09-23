import { Component } from '@angular/core';
import { MenuOptionsService } from './feature/navigation/service/menu-options.service';

@Component({
  selector: 'ese-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public menuOptionsService: MenuOptionsService) {}

  conditionalCall(maybeFunction: undefined | (() => void)): void {
    maybeFunction?.();
  }
}
