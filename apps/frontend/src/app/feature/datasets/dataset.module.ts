import { NgModule } from '@angular/core';
import { DatasetCardComponent } from './components/dataset-card/dataset-card.component';
import { MatCardModule } from '@angular/material/card';
import { UserModule } from '../user/user.module';
import { CommonModule } from '@angular/common';
import { NoDataIllustrationComponent } from './layout/no-data-illustration.component';
import { DatasetsLayoutComponent } from './layout/datasets-layout.component';
import { SharedModule } from '../../shared/shared.module';

const externalComponents = [DatasetCardComponent, DatasetsLayoutComponent];

@NgModule({
  declarations: [...externalComponents, NoDataIllustrationComponent],
  exports: [...externalComponents],
  imports: [UserModule, CommonModule, SharedModule, MatCardModule],
})
export class DatasetModule {}
