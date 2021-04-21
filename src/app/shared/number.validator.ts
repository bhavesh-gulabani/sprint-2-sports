import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  static phone(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value.length != 10)) {
        return { phone: true };
      }
      return null;
    };
  }
}
