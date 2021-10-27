import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

type DialogData = {
  name?: string;
  description?: string;
};

@Component({
  selector: 'ese-datasets-add-dialog',
  templateUrl: 'dataset-add-dialog.component.html',
  styleUrls: ['dataset-add-dialog.component.scss'],
})
export class DatasetAddDialogComponent {
  @ViewChild('fileInput') input?: ElementRef<HTMLInputElement>;

  name = new FormControl(this.data.name ?? '', [Validators.required]);
  description = new FormControl(this.data.description ?? '', [
    Validators.required,
  ]);
  form = this.formBuilder.group({
    name: this.name,
    description: this.description,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DatasetAddDialogComponent>,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {}

  get fileName(): string {
    return this.input?.nativeElement?.files?.[0]?.name ?? '';
  }

  get hasFile(): boolean {
    return this.fileName !== '';
  }

  refresh() {
    this.cdr.markForCheck();
  }

  get canSubmit(): boolean {
    return this.form.valid && this.hasFile;
  }

  close() {
    this.dialogRef.close({
      ...this.form.value,
      file: this.input?.nativeElement?.files?.[0],
    });
  }
}
