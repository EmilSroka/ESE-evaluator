import {
  Inject,
  Injectable,
  InjectionToken,
  OnDestroy,
  Optional,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { STORAGE_KEYS, StorageKeys } from '../storage/storage.keys';
import { StorageService } from '../storage/storage.service';

export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
export const INITIAL_THEME = new InjectionToken<Theme>('INITIAL_THEME');

export const LIGHT_THEME_CLASS_NAME = 'light-theme';
const FALLBACK_INIT_THEME = Theme.LIGHT;

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  private themeState$ = new BehaviorSubject<Theme>(this.initTheme);
  theme$ = this.themeState$.asObservable();
  private updateTheme: Subscription;

  constructor(
    @Optional()
    @Inject(INITIAL_THEME)
    private initTheme: Theme = FALLBACK_INIT_THEME,
    @Inject(STORAGE_KEYS) keys: StorageKeys,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    storage: StorageService,
  ) {
    storage.read<Theme>(keys.theme).subscribe({
      next: theme => this.themeState$.next(theme),
    });
    this.updateTheme = this.themeState$.subscribe({
      next: theme => {
        storage.save(keys.theme, theme);
        this.updateStyles(theme);
      },
    });
  }

  setTheme(theme: Theme): void {
    this.themeState$.next(theme);
  }

  ngOnDestroy(): void {
    this.updateTheme.unsubscribe();
  }

  private updateStyles(theme: Theme): void {
    switch (theme) {
      case 'DARK':
        this.renderer.removeClass(this.document.body, LIGHT_THEME_CLASS_NAME);
        break;
      case 'LIGHT':
        this.renderer.addClass(this.document.body, LIGHT_THEME_CLASS_NAME);
        break;
    }
  }
}
