import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, filter, map, startWith, tap } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';

const POSITIVE_NUMBERS = /^[1-9]\d*$/;
const INIT_PAGE_NUMBER = '1';

@Component({
  selector: 'ese-datasets-list[datasets]',
  templateUrl: 'datasets-list.component.html',
  styleUrls: ['datasets-list.component.scss'],
})
export class DatasetsListComponent implements OnInit {
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
  filteredDatasets$: Observable<DatasetInfoWithOwnerModel[]> = of([]);

  ngOnInit() {
    this.filteredDatasets$ = combineLatest([
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
        const filtered = datasets.filter(
          ({ name, description }) =>
            name.includes(phrase) || description.includes(phrase),
        );
        return filtered.slice(
          this.perPage * page,
          this.perPage * page + this.perPage,
        );
      }),
    );
  }
}
