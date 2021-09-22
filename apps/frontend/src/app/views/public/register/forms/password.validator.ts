import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
