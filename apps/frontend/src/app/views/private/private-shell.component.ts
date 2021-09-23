import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuOptionsService } from '../../feature/navigation/service/menu-options.service';
import { UserService } from '../../feature/user/user.service';
import { Router } from '@angular/router';
import { Path } from '../../app-routing.module';

@Component({
  selector: 'ese-private-shell',
  template: 'PRIVATE PART',
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
        text: this.translate.instant('menu_logout'),
        callback: () => {
          this.userService.logout();
          this.router.navigateByUrl(Path.public);
        },
      },
    ]);
  }
}
