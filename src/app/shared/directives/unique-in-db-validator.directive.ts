import { Directive, Input } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApisService } from '../services/apis.service';

export function UniqueInDbValidatorDirectiveFn(apisService: ApisService, entityName: string, excludedEntityId: number) : AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return apisService.checkUniqueness(entityName, control.value, excludedEntityId)
    .then(
      (isUnique: boolean | null) => {
        return (isUnique) ? null : {'notUniqueInDb': true};
      }
    ).catch(
      error => {
        apisService.saveError(error).subscribe();
        return {'notUniqueInDb_apiError': true};
      }
    );
  };
}

// kali! haven't tested the directive!!!
@Directive({
  selector: '[notUniqueInDb][formControlName],[notUniqueInDb][formControl],[notUniqueInDb][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: UniqueInDbValidatorDirective, multi: true}]
})

export class UniqueInDbValidatorDirective implements AsyncValidator {
  @Input() validatorEntityName: string;
  @Input() excludedEntityId: number;
  constructor(private apisService: ApisService) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>  {
    return UniqueInDbValidatorDirectiveFn(this.apisService, this.validatorEntityName, this.excludedEntityId)(control);
  }

}
