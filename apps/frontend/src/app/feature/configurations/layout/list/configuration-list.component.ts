import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, filter, map, startWith, tap } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { ConfigModel } from '@ese/api-interfaces';

const POSITIVE_NUMBERS = /^[1-9]\d*$/;
const INIT_PAGE_NUMBER = '1';

@Component({
  selector: 'ese-configs-list[configs]',
  templateUrl: 'configuration-list.component.html',
  styleUrls: ['configuration-list.component.scss'],
})
export class ConfigurationListComponent implements OnInit {
  @Input() coolDown = 500;
  @Input() perPage = 3;
  @Input() configs!: Observable<ConfigModel[]>;
  search = new FormControl('');
  page = new FormControl(
    INIT_PAGE_NUMBER,
    Validators.pattern(POSITIVE_NUMBERS),
  );
  lastValidPageNumber = INIT_PAGE_NUMBER;
  filteredConfigs$: Observable<ConfigModel[]> = of([]);

  ngOnInit() {
    this.filteredConfigs$ = combineLatest([
      this.page.valueChanges.pipe(
        startWith(INIT_PAGE_NUMBER),
        filter(value => POSITIVE_NUMBERS.test(value)),
        tap(value => (this.lastValidPageNumber = value)),
        map(Number),
        map(value => value - 1),
      ),
      this.search.valueChanges.pipe(debounceTime(this.coolDown), startWith('')),
      this.configs,
    ]).pipe(
      map(([page, phrase, configs]) => {
        const filtered = configs.filter(
          ({ name, description, dataset }) =>
            name.includes(phrase) ||
            description.includes(phrase) ||
            dataset.name.includes(phrase),
        );
        return filtered.slice(
          this.perPage * page,
          this.perPage * page + this.perPage,
        );
      }),
    );
  }
}
