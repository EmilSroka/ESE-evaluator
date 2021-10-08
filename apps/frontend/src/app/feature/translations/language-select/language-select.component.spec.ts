import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectComponent } from './language-select.component';
import { fireEvent, screen } from '@testing-library/dom';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsService } from '../service/translations.service';
import { of } from 'rxjs';
import userEvent from '@testing-library/user-event';
import { Pipe, PipeTransform } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LanguageSelectComponent', () => {
  let fixture: ComponentFixture<LanguageSelectComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        BrowserAnimationsModule,
      ],
      declarations: [LanguageSelectComponent, TranslatePipeMock, FlagPipeMock],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock },
        {
          provide: TranslationsService,
          useClass: TranslationsInitializerServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectComponent);
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('displays button that shows available languages in own names after click', async () => {
    const button = await screen.findByRole('button');
    userEvent.click(button);
    const languageNames = langConfigFixture.languages.map(
      ({ ownName }) => ownName,
    );
    for (const name of languageNames) {
      const element = await screen.findByText(new RegExp(name));
      expect(element).toBeInTheDocument();
    }
  });

  it('changes language in TranslateService after selecting one', async () => {
    const button = await screen.findByRole('button');
    userEvent.click(button);
    const anotherLanguageName = langConfigFixture.languages[1].ownName;
    const anotherLanguageTag = langConfigFixture.languages[1].tag;
    const changeButton = await screen.findByText(
      new RegExp(anotherLanguageName),
    );
    fireEvent.click(changeButton);
    expect(translateService.use).toHaveBeenCalledTimes(1);
    expect(translateService.use).toHaveBeenCalledWith(anotherLanguageTag);
  });
});

class TranslateServiceMock {
  use = jest.fn();
}

class TranslationsInitializerServiceMock {
  config = of(langConfigFixture);
}

const langConfigFixture = {
  defaultLanguage: 'en',
  languages: [
    {
      tag: 'en',
      ownName: 'English',
      englishName: 'English',
    },
    {
      tag: 'es',
      ownName: 'española',
      englishName: 'Spanish',
    },
  ],
};

const TRANSLATED_TEXT = 'translated text';
const FLAG = '🇵🇱';

@Pipe({
  name: 'translate',
})
class TranslatePipeMock implements PipeTransform {
  transform(): string {
    return TRANSLATED_TEXT;
  }
}

@Pipe({
  name: 'flag',
})
class FlagPipeMock implements PipeTransform {
  transform(): string {
    return FLAG;
  }
}
