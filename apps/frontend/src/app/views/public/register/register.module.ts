import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RegisterIllustrationComponent } from './illustration.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownDialogModule } from '../../../shared/markdown-dialog/markdown-dialog.module';

const materialComponents = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MarkdownModule,
];

@NgModule({
  declarations: [RegisterComponent, RegisterIllustrationComponent],
  exports: [RegisterComponent],
  imports: [
    ...materialComponents,
    ReactiveFormsModule,
    SharedModule,
    MarkdownDialogModule,
  ],
})
export class RegisterModule {}
