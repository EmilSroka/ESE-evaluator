import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './feature/navigation/navigation.module';
import { AppRotingModule } from './app-routing.module';
import { TranslationsModule } from './feature/translations/translations.module';
import { ThemeModule } from './feature/theme/theme.module';
import { CoreModule } from './core/core.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRotingModule,
    SharedModule,
    NavigationModule,
    TranslationsModule,
    ThemeModule,
    MatListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
