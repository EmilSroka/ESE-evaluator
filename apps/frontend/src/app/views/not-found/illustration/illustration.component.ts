import { Component } from '@angular/core';
import { ThemeService } from '../../../feature/theme/service/theme.service';

@Component({
  selector: 'ese-illustration',
  templateUrl: './illustration.component.html',
})
export class IllustrationComponent {
  sunColor = '#ff6584';
  beingsColor = 'transparent';
  primaryColor = 'transparent';
  groundColor = 'transparent';
  treeColor = 'transparent';
  eyeColor = 'transparent';

  constructor(private theme: ThemeService) {
    theme.theme$.subscribe({
      next: theme => {
        switch (theme) {
          case 'LIGHT':
            this.primaryColor = this.treeColor = '#007c6c';
            this.beingsColor = this.groundColor = '#303030';
            this.eyeColor = '#ffffff';
            break;
          case 'DARK':
            this.primaryColor = this.treeColor = '#029a8a';
            this.beingsColor = this.groundColor = '#dfdfdf';
            this.eyeColor = '#303030';
            break;
        }
      },
    });
  }
}
