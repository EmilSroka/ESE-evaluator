import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IllustrationComponent } from './illustration.component';
import * as faker from 'faker';
import { getByRole } from '@testing-library/dom';
import { Pipe, PipeTransform } from '@angular/core';
import { cold } from 'jest-marbles';
import {
  Theme,
  ThemeService,
} from '../../../feature/theme/service/theme.service';

describe('IllustrationComponent', () => {
  let fixture: ComponentFixture<IllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ThemeService, useClass: ThemeServiceMock }],
      declarations: [IllustrationComponent, TranslatePipeMock],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationComponent);
    fixture.detectChanges();
  });

  it('creates svg of role img', () => {
    const element = getByRole(fixture.elementRef.nativeElement, 'img');
    expect(element).toBeInTheDocument();
  });
});

@Pipe({
  name: 'translate',
})
class TranslatePipeMock implements PipeTransform {
  transform(): string {
    return faker.datatype.string();
  }
}

class ThemeServiceMock {
  theme$ = cold('a', { a: Theme.LIGHT });
}
