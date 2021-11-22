import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from '../../../feature/configurations/configurations.service';
import { Router } from '@angular/router';
import { Path } from '../../../app-routing.module';
import { PrivatePath } from '../private-routes';
import { map } from 'rxjs/operators';
import { UserService } from '../../../feature/user/user.service';
import { combineLatest } from 'rxjs';
import { MarkdownDialogComponent } from '../../../shared/markdown-dialog/markdown-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

const MODAL_WIDTH = '400px';

@Component({
  selector: 'ese-configurations-view',
  templateUrl: 'configurations.component.html',
  styleUrls: ['configurations.component.scss'],
})
export class ConfigurationsComponent implements OnInit {
  constructor(
    private config: ConfigurationsService,
    private translate: TranslateService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  configs$ = this.config.configurations$;
  myConfigs$ = combineLatest([
    this.config.configurations$,
    this.userService.get(),
  ]).pipe(
    map(([configs, user]) => {
      const result = [];
      for (const config of configs) {
        if (config.owner.username !== user?.username) continue;
        result.push(config);
      }
      return result;
    }),
  );

  ngOnInit(): void {
    this.config.update();
  }

  add(): void {
    this.router.navigateByUrl(
      `${Path.private}/${PrivatePath.addConfiguration}`,
    );
  }

  openHelpInfo(): void {
    this.dialog.open(MarkdownDialogComponent, {
      data: this.translate.instant('modal_config'),
      width: MODAL_WIDTH,
    });
  }
}
