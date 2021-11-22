import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { SelectDatasetDialogComponent } from './select-dataset-dialog.component';
import { AddConfigModel, DatasetInfoWithOwnerModel } from '@ese/api-interfaces';

const NO_DATASET_TRANSLATION_KEY = 'configs_add_no_dataset';
const MODAL_WIDTH = '450px';
const SIZE_LIMIT = 100;

@Component({
  selector: 'ese-configs-add-form',
  templateUrl: 'configuration-add-form.component.html',
  styleUrls: ['configuration-add-form.component.scss'],
})
export class ConfigurationAddFormComponent {
  @Input() isLoading = false;
  @Output() add = new EventEmitter<AddConfigModel>();
  categoriesLimit = SIZE_LIMIT;
  seedsLimit = SIZE_LIMIT;

  dataset = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  categories = new FormControl(1, [
    Validators.required,
    Validators.min(1),
    Validators.max(SIZE_LIMIT),
  ]);
  seeds = new FormControl(1, [
    Validators.required,
    Validators.min(1),
    Validators.max(SIZE_LIMIT),
  ]);

  form = this.fb.group({
    ownerUsername: [''],
    datasetName: this.dataset,
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
        next: (dataset: DatasetInfoWithOwnerModel) => {
          this.dataset.setValue(dataset.name);
          this.categories.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(dataset.categories),
          ]);
          this.seeds.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(dataset.seeds),
          ]);
          this.categoriesLimit = dataset.categories;
          this.seedsLimit = dataset.seeds;
        },
      });
  }

  get selectedDataset(): string {
    return (
      this.dataset.value || this.translate.instant(NO_DATASET_TRANSLATION_KEY)
    );
  }

  get displayDatasetError(): boolean {
    return this.dataset.invalid && !this.form.pristine;
  }

  shouldDisplayError(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  doAdd(): void {
    this.user.get().subscribe(user => {
      const data = { ...this.form.value };
      data.ownerUsername = user?.username;
      this.add.emit(data);
    });
  }
}
