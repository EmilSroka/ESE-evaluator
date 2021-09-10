import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const INIT_STATE = 'close';

type State = 'open' | 'close';

@Injectable()
export class NavigationService {
  private navigationState = new BehaviorSubject<State>(INIT_STATE);
  state = this.navigationState.asObservable();

  toggle(): void {
    this.navigationState.next(
      this.navigationState.value === 'close' ? 'open' : 'close',
    );
  }

  open(): void {
    this.navigationState.next('open');
  }

  close(): void {
    this.navigationState.next('close');
  }
}
