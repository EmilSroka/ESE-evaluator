import { NgModule } from '@angular/core';
import { NavigationLayoutComponent } from './layout/navigation-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { NavigationService } from './service/navigation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const materialModules = [
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTooltipModule,
  MatButtonModule,
];

@NgModule({
  providers: [NavigationService],
  declarations: [NavigationLayoutComponent],
  exports: [NavigationLayoutComponent],
  imports: [...materialModules, BrowserAnimationsModule, SharedModule],
})
export class NavigationModule {}
