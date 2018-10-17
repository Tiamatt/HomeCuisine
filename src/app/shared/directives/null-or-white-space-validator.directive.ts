import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

export function NullOrWhiteSpaceValidatorDirectiveFn() : ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if(control.value == null 
      || control.value.length === 0 
      || (control.value.trim().length === 0) ){
          return {'nullOrWhiteSpace': true};
      }
      return null;
  };
}

// kali! haven't tested the directive!!!
@Directive({
  selector: '[nullOrWhiteSpace][formControlName],[nullOrWhiteSpace][formControl],[nullOrWhiteSpace][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: NullOrWhiteSpaceValidatorDirective, multi: true}]
})
export class NullOrWhiteSpaceValidatorDirective implements Validator {
  constructor() { }

  validate(control: AbstractControl): {[s: string]: boolean} | null {
    return NullOrWhiteSpaceValidatorDirectiveFn()(control);
  }

}