import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';
import { combineLatest, Observable, of } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, filter, map, startWith, tap } from 'rxjs/operators';
import escapeStringRegexp from 'escape-string-regexp';

const POSITIVE_NUMBERS = /^[1-9]\d*$/;
const INIT_PAGE_NUMBER = '1';

@Component({
  selector: 'ese-datasets-list-layout[datasets]',
  templateUrl: 'datasets-list-layout.component.html',
  styleUrls: ['datasets-list-layout.component.scss'],
})
export class DatasetsListLayoutComponent implements OnInit {
  @Input() coolDown = 500;
  @Input() perPage = 3;
  @Input() datasets!: Observable<DatasetInfoWithOwnerModel[]>;
  @Input() isEditable = false;
  @Output() edit = new EventEmitter<DatasetInfoWithOwnerModel>();
  search = new FormControl('');
  page = new FormControl(
    INIT_PAGE_NUMBER,
    Validators.pattern(POSITIVE_NUMBERS),
  );
  lastValidPageNumber = INIT_PAGE_NUMBER;
  filtered$: Observable<DatasetInfoWithOwnerModel[]> = of([]);

  ngOnInit() {
    this.filtered$ = combineLatest([
      this.page.valueChanges.pipe(
        startWith(INIT_PAGE_NUMBER),
        filter(value => POSITIVE_NUMBERS.test(value)),
        tap(value => (this.lastValidPageNumber = value)),
        map(Number),
        map(value => value - 1),
      ),
      this.search.valueChanges.pipe(debounceTime(this.coolDown), startWith('')),
      this.datasets,
    ]).pipe(
      map(([page, phrase, datasets]) => {
        const regex = new RegExp(escapeStringRegexp(phrase), 'i');
        const filtered = datasets.filter(
          ({ name, description }) =>
            regex.test(name) || regex.test(description),
        );
        return filtered.slice(
          this.perPage * page,
          this.perPage * page + this.perPage,
        );
      }),
    );
  }
}
