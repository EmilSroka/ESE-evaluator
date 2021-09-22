import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { passwordsMatchErrorName } from './password.validator';

export class ConfirmPasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    const isDirty = Boolean(control?.dirty);
    const isPasswordsMismatch = Boolean(
      control?.parent?.hasError(passwordsMatchErrorName),
    );

    return isDirty && isPasswordsMismatch;
  }
}
