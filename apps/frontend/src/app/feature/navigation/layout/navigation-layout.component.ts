import { Component } from '@angular/core';
import { NavigationService } from '../service/navigation.service';
import { Disposable } from '../../../shared/disposable/disposable.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ese-navigation-layout',
  templateUrl: './navigation-layout.component.html',
  styleUrls: ['./navigation-layout.component.scss'],
  providers: [Disposable],
})
export class NavigationLayoutComponent {
  isOpen = false;

  constructor(
    public navigationService: NavigationService,
    dispose$: Disposable,
  ) {
    this.navigationService.state.pipe(takeUntil(dispose$)).subscribe(state => {
      this.isOpen = state === 'open';
    });
  }
}
