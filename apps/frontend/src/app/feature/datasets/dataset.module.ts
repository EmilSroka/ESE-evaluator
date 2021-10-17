import { NgModule } from '@angular/core';
import { DatasetCardComponent } from './components/dataset-card/dataset-card.component';
import { MatCardModule } from '@angular/material/card';
import { UserModule } from '../user/user.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NoDataIllustrationComponent } from './layout/list/no-data-illustration.component';
import { DatasetsListLayoutComponent } from './layout/list/datasets-list-layout.component';
import { DatasetAddDialogComponent } from './layout/add/dataset-add-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const materialComponents = [
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
];

const externalComponents = [
  DatasetCardComponent,
  DatasetsListLayoutComponent,
  DatasetAddDialogComponent,
];

@NgModule({
  declarations: [...externalComponents, NoDataIllustrationComponent],
  exports: [...externalComponents],
  imports: [
    ...materialComponents,
    UserModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class DatasetModule {}
