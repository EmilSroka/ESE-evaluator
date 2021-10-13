import { NgModule } from '@angular/core';
import { DatasetsComponent } from './datasets.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DatasetsIllustrationComponent } from './datasets-illustrations.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [DatasetsComponent, DatasetsIllustrationComponent],
  exports: [DatasetsComponent],
  imports: [MatTabsModule, SharedModule],
})
export class DatasetsModule {}
