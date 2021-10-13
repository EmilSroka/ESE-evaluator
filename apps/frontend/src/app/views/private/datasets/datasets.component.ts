import { Component } from '@angular/core';
import { DatasetsService } from '../../../feature/datasets/datasets.service';
import { map } from 'rxjs/operators';
import { UserService } from '../../../feature/user/user.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'ese-datasets-view',
  templateUrl: 'datasets.component.html',
  styleUrls: ['datasets.component.scss'],
})
export class DatasetsComponent {
  datasets$ = this.datasetsService.datasets$;
  myDatasets$ = combineLatest([this.datasets$, this.userService.get()]).pipe(
    map(([datasets, user]) => {
      return datasets.filter(({ username }) => username === user?.username);
    }),
  );

  constructor(
    private datasetsService: DatasetsService,
    private userService: UserService,
  ) {
    this.datasetsService.update();
  }
}
