import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserModel, UserUpdateModel } from '@ese/api-interfaces';

@Component({
  selector: 'ese-user[data]',
  templateUrl: 'user-layout.component.html',
})
export class UserLayoutComponent {
  @Input() data!: UserModel;
  @Input() isEditable = false;
  @Output() edit = new EventEmitter<UserUpdateModel>();
  isDisplayMode = true;

  save(update: UserUpdateModel): void {
    this.isDisplayMode = true;
    this.edit.emit(update);
  }
}
