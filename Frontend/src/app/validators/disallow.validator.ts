import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function disallowValuesValidator(
  disallowedValues: string[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const input = control.value.toString().toLowerCase();

    const invalid = disallowedValues.some(
      (value) => !input.localeCompare(value)
    );

    return invalid ? { disallowedValue: control.value } : null;
  };
}
