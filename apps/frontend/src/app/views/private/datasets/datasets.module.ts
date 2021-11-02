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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DatasetsListComponent } from './list/datasets-list.component';
import { AddDatasetService } from './services/add.service';
import { EditDatasetService } from './services/edit.service';

const materialComponents = [
  MatDialogModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    DatasetsComponent,
    DatasetsListComponent,
    DatasetsIllustrationComponent,
  ],
  providers: [AddDatasetService, EditDatasetService],
  exports: [DatasetsComponent],
  imports: [
    ...materialComponents,
    SharedModule,
    DatasetModule,
    ReactiveFormsModule,
  ],
})
export class DatasetsModule {}
