import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { SelectDatasetDialogComponent } from './select-dataset-dialog.component';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';

const NO_DATASET_TRANSLATION_KEY = 'configs_add_no_dataset';
const DATASET_FIELD_NAME = 'dataset_name';
const MODAL_WIDTH = '450px';

@Component({
  selector: 'ese-configs-add-form',
  templateUrl: 'configuration-add-form.component.html',
  styleUrls: ['configuration-add-form.component.scss'],
})
export class ConfigurationAddFormComponent {
  @Input() isLoading = false;
  @Output() add = new EventEmitter<undefined>();

  dataset = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  categories = new FormControl(0, [Validators.required, Validators.min(0)]);
  seeds = new FormControl(0, [Validators.required, Validators.min(0)]);

  form = this.fb.group({
    owner_username: [this.user.get() ?? ''],
    [DATASET_FIELD_NAME]: this.dataset,
    name: this.name,
    description: this.description,
    categories: this.categories,
    seeds: this.seeds,
  });

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private translate: TranslateService,
    private dialog: MatDialog,
  ) {}

  selectDataset(): void {
    const dialogRef = this.dialog.open(SelectDatasetDialogComponent, {
      width: MODAL_WIDTH,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(data => data != null))
      .subscribe({
        next: (dataset: DatasetInfoWithOwnerModel) =>
          this.dataset.setValue(dataset.name),
      });
  }

  get selectedDataset(): string {
    return (
      this.datasetField?.value ||
      this.translate.instant(NO_DATASET_TRANSLATION_KEY)
    );
  }

  get datasetField(): AbstractControl | null {
    return this.form.get(DATASET_FIELD_NAME);
  }

  get displayDatasetError(): boolean {
    return (this.datasetField?.invalid && this.datasetField?.touched) ?? false;
  }

  shouldDisplayError(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  doAdd(): void {
    this.add.emit();
  }
}
