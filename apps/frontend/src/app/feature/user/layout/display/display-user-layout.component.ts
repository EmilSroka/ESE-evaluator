import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UserModel } from '@ese/api-interfaces';

const USERNAME_SEPARATOR = ' ';

@Component({
  selector: 'ese-display-user',
  templateUrl: 'display-user-layout.component.html',
  styleUrls: ['display-user-layout.component.scss'],
})
export class DisplayUserLayoutComponent {
  @Input() data?: UserModel;
  @Input() isEditable = false;
  @Output() edit = new EventEmitter<undefined>();

  get initials(): string {
    if (this.data == undefined) return '';
    return this.data.username
      .split(USERNAME_SEPARATOR)
      .map(word => word.charAt(0))
      .join('');
  }
}
