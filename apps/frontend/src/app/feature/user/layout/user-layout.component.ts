import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserModel, UserUpdateModel } from '@ese/api-interfaces';

type State = 'LOADING' | 'DISPLAY' | 'EDIT';

@Component({
  selector: 'ese-user[data]',
  templateUrl: 'user-layout.component.html',
})
export class UserLayoutComponent {
  @Input() data?: UserModel;
  @Input() isEditable = false;
  @Output() edit = new EventEmitter<UserUpdateModel>();
  get state(): State {
    if (this.data == null) return 'LOADING';
    if (this.isDisplayMode) return 'DISPLAY';
    return 'EDIT';
  }
  private isDisplayMode = true;

  discard(): void {
    this.isDisplayMode = true;
  }

  changeToEditMode(): void {
    this.isDisplayMode = false;
  }

  save(update: UserUpdateModel): void {
    this.isDisplayMode = true;
    this.edit.emit(update);
  }
}
