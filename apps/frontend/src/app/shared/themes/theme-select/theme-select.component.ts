import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme, ThemeService } from '../../../core/theme/theme.service';

@Component({
  selector: 'ese-theme-select',
  templateUrl: './theme-select.component.html',
})
export class ThemeSelectComponent {
  theme$: Observable<Theme> = this.themeService.theme$;
  themes = Theme;

  constructor(private themeService: ThemeService) {}

  select(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
