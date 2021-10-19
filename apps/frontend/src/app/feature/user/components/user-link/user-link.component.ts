import { Component, Input } from '@angular/core';
import { PrivatePath } from '../../../../views/private/private-routes';
import { Path } from '../../../../app-routing.module';

const USERNAME_SEPARATOR = ' ';

@Component({
  selector: 'ese-user-link',
  templateUrl: 'user-link.component.html',
  styleUrls: ['user-link.component.scss'],
})
export class UserLinkComponent {
  @Input() username = '';
  @Input() base = `${Path.private}/${PrivatePath.user}`;

  get initials(): string {
    return this.username
      .split(USERNAME_SEPARATOR)
      .map(word => word.charAt(0))
      .join('');
  }

  get link(): string {
    return `/${this.base}/${this.username}`;
  }
}
