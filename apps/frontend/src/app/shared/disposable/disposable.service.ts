import { Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

/** It's a class that allows to automatically cancel active subscribes on destroy
 * Declare it locally as a component provider and inject via constructor.
 * Then every time you subscribe, add `takeUntil` as a last operator
 * */
@Injectable()
export class Disposable extends Subject<never> implements OnDestroy {
  ngOnDestroy() {
    this.next();
    this.complete();
  }
}
