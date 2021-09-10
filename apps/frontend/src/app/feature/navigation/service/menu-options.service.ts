import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Option = {
  link: string;
  text: string;
};

@Injectable({
  providedIn: 'root',
})
export class MenuOptionsService {
  private state = new BehaviorSubject<Option[]>([]);
  option$ = this.state.asObservable();

  setOptions(options: Option[]) {
    this.state.next(options);
  }
}
