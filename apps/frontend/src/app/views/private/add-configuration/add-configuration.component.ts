import { Component } from '@angular/core';
import { ConfigurationsService } from '../../../feature/configurations/configurations.service';
import { Location } from '@angular/common';
import { AddConfigModel } from '@ese/api-interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ese-add-configuration',
  templateUrl: 'add-configuration.component.html',
  styleUrls: ['add-configuration.component.scss'],
})
export class AddConfigurationComponent {
  isLoading = false;

  constructor(
    private configurationsService: ConfigurationsService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {}

  goBack(): void {
    this.location.back();
  }

  add(config: AddConfigModel): void {
    this.isLoading = true;
    this.displayStartMessage();

    this.configurationsService.add(config).subscribe({
      next: isSuccess => {
        this.isLoading = false;
        if (isSuccess) {
          this.displaySuccessMessage();
          this.goBack();
        } else {
          this.displayFailureMessage();
        }
      },
    });
  }

  private displayStartMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_add_config'),
      this.translate.instant('toast_ok'),
    );
  }

  private displaySuccessMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_add_config_success'),
      this.translate.instant('toast_ok'),
    );
  }

  private displayFailureMessage(): void {
    this.snackBar.open(
      this.translate.instant('toast_add_config_fail'),
      this.translate.instant('toast_ok'),
    );
  }
}
