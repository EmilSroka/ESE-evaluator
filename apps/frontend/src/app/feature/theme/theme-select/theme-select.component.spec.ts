import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSelectComponent } from './theme-select.component';
import { fireEvent, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Pipe, PipeTransform } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Theme, ThemeService } from '../service/theme.service';
import { Subject } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

describe('ThemeSelectComponent', () => {
  let fixture: ComponentFixture<ThemeSelectComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        MatMenuModule,
        BrowserAnimationsModule,
      ],
      declarations: [ThemeSelectComponent, TranslatePipeMock],
      providers: [{ provide: ThemeService, useClass: ThemeServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSelectComponent);
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('displays button that shows available themes after click', async () => {
    const button = await screen.findByRole('button');
    userEvent.click(button);
    for (const theme of themes) {
      const element = await screen.findByText(new RegExp(themeToName[theme]));
      expect(element).toBeInTheDocument();
    }
  });

  it('changes theme in ThemeService after selecting one', async () => {
    const button = await screen.findByRole('button');
    userEvent.click(button);
    const changeButton = await screen.findByText(
      new RegExp(themeToName[otherTheme]),
    );
    fireEvent.click(changeButton);
    expect(themeService.setTheme).toHaveBeenCalledTimes(1);
    expect(themeService.setTheme).toHaveBeenCalledWith(otherTheme);
  });
});

const initTheme = Theme.LIGHT;
const otherTheme = Theme.DARK;

class ThemeServiceMock {
  setTheme = jest.fn();
  theme$ = new Subject();

  constructor() {
    this.setTheme.mockImplementation(value => this.theme$.next(value));
    this.theme$.next(initTheme);
  }
}

const themes = [Theme.DARK, Theme.LIGHT];
const themeToName = {
  [Theme.DARK]: 'theme_dark',
  [Theme.LIGHT]: 'theme_light',
};

@Pipe({
  name: 'translate',
})
class TranslatePipeMock implements PipeTransform {
  transform(text: string): string {
    return text;
  }
}
