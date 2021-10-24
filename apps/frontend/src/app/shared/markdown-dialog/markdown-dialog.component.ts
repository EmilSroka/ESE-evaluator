import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ese-markdown-dialog',
  template: `
    <markdown [data]="content"></markdown>
    <div class="button-wrapper">
      <button mat-flat-button (click)="close()">
        {{ 'modal_ok' | translate }}
      </button>
    </div>
  `,
  styles: [
    `
      .button-wrapper {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
})
export class MarkdownDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MarkdownDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public content: string,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
