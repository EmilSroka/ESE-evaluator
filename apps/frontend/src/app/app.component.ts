import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ese/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ese-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _btnState = new BehaviorSubject<boolean>(true);
  btnState = this._btnState.asObservable();

  constructor(private http: HttpClient, private translate: TranslateService) {}

  change() {
    this._btnState.next(!this._btnState.value);
    this.translate.use('pl');
  }
}
