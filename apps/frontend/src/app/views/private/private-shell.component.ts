import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuOptionsService } from '../../feature/navigation/service/menu-options.service';
import { UserService } from '../../feature/user/user.service';
import { Router } from '@angular/router';
import { Path } from '../../app-routing.module';
import { PrivatePath } from './private-routes';

@Component({
  selector: 'ese-private-shell',
  template: '<router-outlet></router-outlet>',
})
export class PrivateShellComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly menu: MenuOptionsService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
    this.updateMenu();
    this.translate.onLangChange.subscribe(() => this.updateMenu());
  }

  updateMenu(): void {
    this.menu.setOptions([
      {
        text: this.translate.instant('menu_me'),
        link: `${Path.private}/${PrivatePath.me}`,
      },
      {
        text: this.translate.instant('menu_datasets'),
        link: `${Path.private}/${PrivatePath.datasets}`,
      },
      {
        text: this.translate.instant('menu_configurations'),
        link: `${Path.private}/${PrivatePath.configurations}`,
      },
      {
        text: this.translate.instant('menu_logout'),
        callback: () => {
          this.userService.logout();
          this.router.navigateByUrl(Path.public);
        },
      },
    ]);
  }
}
