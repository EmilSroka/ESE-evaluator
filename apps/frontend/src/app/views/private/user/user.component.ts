import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { USERNAME_PATH_PARAM_NAME } from '../private-routes';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { UsersService } from '../../../feature/user/users.service';
import { UserModel } from '@ese/api-interfaces';
import { Disposable } from '../../../shared/disposable/disposable.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ese-user-view',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  providers: [Disposable],
})
export class UserComponent {
  user?: UserModel;
  isError = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private users: UsersService,
    private dispose$: Disposable,
  ) {
    this.route.params
      .pipe(
        map(params => params[USERNAME_PATH_PARAM_NAME]),
        switchMap(username => this.users.get(username)),
        takeUntil(dispose$),
      )
      .subscribe({
        next: user => {
          this.user = user;
          this.isError = false;
        },
        error: () => (this.isError = true),
      });
  }

  goBack() {
    this.location.back();
  }
}
