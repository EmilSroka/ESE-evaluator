import { NgModule } from '@angular/core';
import { DatasetsComponent } from './datasets.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DatasetsIllustrationComponent } from './datasets-illustrations.component';
import { SharedModule } from '../../../shared/shared.module';
import { DatasetModule } from '../../../feature/datasets/dataset.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

const materialComponents = [
  MatDialogModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [DatasetsComponent, DatasetsIllustrationComponent],
  exports: [DatasetsComponent],
  imports: [SharedModule, DatasetModule, ...materialComponents],
})
export class DatasetsModule {}
