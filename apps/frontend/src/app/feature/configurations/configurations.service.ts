import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigModel } from '@ese/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationsService {
  private configurations = new BehaviorSubject<ConfigModel[]>(mock);
  configurations$ = this.configurations.asObservable();

  clear(): void {
    this.configurations.next([]);
  }
}

const model1: ConfigModel = {
  name: 'Example config',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget elit porttitor purus fermentum malesuada in quis tortor. Ut finibus lectus sed velit cursus, vel placerat urna interdum. Donec a dolor a felis scelerisque iaculis tempus at lacus.',
  seeds: 5,
  categories: 13,
  dataset: {
    name: 'Elo',
    description: 'Hi hi hi',
    username: 'HiHiHi',
  },
  owner: {
    username: 'Emil Sroka',
    organization: 'AGH',
  },
};

const model2: ConfigModel = {
  name: 'Alllla',
  description: 'Alllla',
  seeds: 5,
  categories: 13,
  dataset: {
    name: 'Elo',
    description: 'Hi hi hi',
    username: 'HiHiHi',
  },
  owner: {
    username: 'Emil Sroka',
    organization: 'AGH',
  },
};

const mock = [model1, model2, model2, model1, model1, model2, model1, model2];
