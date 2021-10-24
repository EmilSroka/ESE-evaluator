import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { MarkdownDialogComponent } from './markdown-dialog.component';
import { MarkdownModule } from 'ngx-markdown';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MarkdownDialogComponent],
  exports: [MarkdownDialogComponent, MatDialogModule],
  imports: [SharedModule, MarkdownModule, MatDialogModule, MatButtonModule],
})
export class MarkdownDialogModule {}
