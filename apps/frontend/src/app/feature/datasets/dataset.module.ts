import { NgModule } from '@angular/core';
import { DatasetCardComponent } from './components/dataset-card/dataset-card.component';
import { MatCardModule } from '@angular/material/card';
import { UserModule } from '../user/user.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DatasetCardComponent],
  exports: [DatasetCardComponent],
  imports: [UserModule, CommonModule, MatCardModule],
})
export class DatasetModule {}
