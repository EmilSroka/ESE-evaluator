import { Component } from '@angular/core';
import { UserService } from '../../../feature/user/user.service';
import { UserModel, UserUpdateModel } from '@ese/api-interfaces';
import { Disposable } from '../../../shared/disposable/disposable.service';
import { filter, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ese-me-view',
  templateUrl: 'me.component.html',
  styleUrls: ['me.component.scss'],
  providers: [Disposable],
})
export class MeComponent {
  user?: UserModel;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private dispose$: Disposable,
  ) {
    this.userService
      .get()
      .pipe(takeUntil(dispose$))
      .subscribe({
        next: user => (this.user = user),
      });
  }

  edit(diff: UserUpdateModel) {
    this.userService
      .update(diff)
      .pipe(filter(isSuccess => !isSuccess))
      .subscribe(() =>
        this.snackBar.open(
          this.translate.instant('toast_cannot_update_user'),
          this.translate.instant('toast_ok'),
        ),
      );
  }
}
