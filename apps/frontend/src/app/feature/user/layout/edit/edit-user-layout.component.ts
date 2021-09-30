import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel, UserUpdateModel } from '@ese/api-interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  passwordsMatch,
  passwordsMatchErrorName,
  validPassword,
} from '../../../../shared/forms/password.validator';
import { validUsername } from '../../../../shared/forms/username.validator';
import { ConfirmPasswordMatcher } from '../../../../shared/forms/confirm-password.matcher';

@Component({
  selector: 'ese-edit-user',
  templateUrl: 'edit-user-layout.component.html',
  styleUrls: ['edit-user-layout.component.scss'],
})
export class EditUserLayoutComponent implements OnInit {
  @Input() initial?: UserModel;
  @Output() save = new EventEmitter<UserUpdateModel>();
  @Output() discard = new EventEmitter<undefined>();

  username!: FormControl;
  organization!: FormControl;
  about!: FormControl;
  password!: FormControl;
  repeatPassword!: FormControl;
  form!: FormGroup;

  repeatPasswordErrorMatcher = new ConfirmPasswordMatcher();

  get isRepeatPasswordInvalid(): boolean {
    return this.form.hasError(passwordsMatchErrorName);
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.username = new FormControl(this.initial?.username ?? '', [
      validUsername(true),
    ]);
    this.organization = new FormControl(this.initial?.organization ?? '');
    this.about = new FormControl(this.initial?.about ?? '');
    this.password = new FormControl('', [validPassword(true)]);
    this.repeatPassword = new FormControl('');
    this.form = this.formBuilder.group(
      {
        username: this.username,
        password: this.password,
        repeatPassword: this.repeatPassword,
        about: this.about,
        organization: this.organization,
      },
      { validators: passwordsMatch('password', 'repeatPassword') },
    );
  }

  discardChanges(): void {
    this.discard.emit();
  }

  saveChanges(): void {
    this.save.emit(this.getUpdateObject());
  }

  cannotSave(): boolean {
    return this.form.invalid || isEmpty(this.getUpdateObject());
  }

  private getUpdateObject(): UserUpdateModel {
    const update: UserUpdateModel = {};
    if (this.username.value !== this.initial?.username)
      update.username = this.username.value;
    if (this.about.value !== this.initial?.about)
      update.about = this.about.value;
    if (this.organization.value !== this.initial?.organization)
      update.organization = this.organization.value;
    if (this.password.value.length > 0) update.password = this.password.value;
    return update;
  }
}

function isEmpty(object: Record<string, any>): boolean {
  return Object.keys(object).length === 0;
}
