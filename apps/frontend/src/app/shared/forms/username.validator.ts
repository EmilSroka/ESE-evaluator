import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isUsernameValid } from '@ese/validators';

export const invalidUserErrorName = 'invalidUsername';
export function validUsername(skipIfEmpty: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (skipIfEmpty && control.value === '') return null;
    return isUsernameValid(control.value)
      ? null
      : { [invalidUserErrorName]: true };
  };
}
