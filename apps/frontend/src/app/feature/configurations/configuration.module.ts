import { NgModule } from '@angular/core';
import { ConfigurationCardComponent } from './components/configuration-card/configuration-card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ConfigurationListComponent } from './layout/list/configuration-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { IllustrationsModule } from '../../shared/illustrations/illustrations.module';
import { ConfigurationAddFormComponent } from './components/add-card/configuration-add-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SelectDatasetDialogComponent } from './components/add-card/select-dataset-dialog.component';
import { DatasetModule } from '../datasets/dataset.module';

const materialModules = [
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
];

const externalComponents = [
  ConfigurationAddFormComponent,
  ConfigurationListComponent,
];

const internalComponents = [
  SelectDatasetDialogComponent,
  ConfigurationCardComponent,
];

@NgModule({
  declarations: [...externalComponents, ...internalComponents],
  imports: [
    ...materialModules,
    SharedModule,
    UserModule,
    ReactiveFormsModule,
    IllustrationsModule,
    DatasetModule,
  ],
  exports: [...externalComponents],
})
export class ConfigurationModule {}
