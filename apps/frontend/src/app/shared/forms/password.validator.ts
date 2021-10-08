import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isPasswordValid } from '@ese/validators';

export const passwordsMatchErrorName = 'passwordsNotSame';
export function passwordsMatch(
  passwordControl: string,
  confirmPasswordControl: string,
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const {
      [passwordControl]: password = '',
      [confirmPasswordControl]: confirmed = '',
    } = group.value;
    return password === confirmed ? null : { [passwordsMatchErrorName]: true };
  };
}

export const invalidPasswordErrorName = 'invalidPassword';
export function validPassword(skipIfEmpty: boolean = false): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (skipIfEmpty && control.value === '') return null;
    return isPasswordValid(control.value)
      ? null
      : { [invalidPasswordErrorName]: true };
  };
}
