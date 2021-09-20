import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ese-login-view',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  login() {
    // todo: delete console log
    // todo: add odd login service
  }
}
