import { NgModule } from '@angular/core';
import { DatasetsComponent } from './datasets.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DatasetsIllustrationComponent } from './datasets-illustrations.component';
import { SharedModule } from '../../../shared/shared.module';
import { DatasetModule } from '../../../feature/datasets/dataset.module';

@NgModule({
  declarations: [DatasetsComponent, DatasetsIllustrationComponent],
  exports: [DatasetsComponent],
  imports: [SharedModule, DatasetModule, MatTabsModule],
})
export class DatasetsModule {}
