import { Component } from '@angular/core';
import { MenuOptionsService } from '../../feature/navigation/service/menu-options.service';
import { TranslateService } from '@ngx-translate/core';
import { PublicPath } from './public-routes';

@Component({
  selector: 'ese-public-shell',
  template: '<router-outlet></router-outlet>',
})
export class PublicShellComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly menu: MenuOptionsService,
  ) {
    this.updateMenu();
    this.translate.onLangChange.subscribe(() => this.updateMenu());
  }

  updateMenu(): void {
    this.menu.setOptions([
      {
        link: PublicPath.login,
        text: this.translate.instant('menu_login'),
      },
      {
        link: PublicPath.register,
        text: this.translate.instant('menu_register'),
      },
    ]);
  }
}
