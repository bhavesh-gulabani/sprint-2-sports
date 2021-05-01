import { AbstractControl, Validator, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  static phone(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value.length != 10)) {
        return { phone: true };
      }
      return null;
    };
  }

  static correctNumber(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && isNaN(c.value)) {
        return { correctNumber: true };
      }
      return null;
    };
  }

  static cvv(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value.length != 3) {
        return { cvv: true };
      }
      return null;
    };
  }
  
  static cardNumber(): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value.length != 16) {
        return { cardNumber: true };
      }
      return null;
    };
  }


}
