import { Component } from '@angular/core';
import { ConfigModel } from '@ese/api-interfaces';

@Component({
  selector: 'ese-configurations-view',
  templateUrl: 'configurations.component.html',
  styleUrls: ['configurations.component.scss'],
})
export class ConfigurationsComponent {
  model: ConfigModel = {
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
}
