import { GeneralService } from './../shared/services/general.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

export class BaseComponent {
    constructor() {
    }

    isStringPositiveNumber(stringNumber:string, isIcludeZero: boolean = false){
        let regexp = (isIcludeZero) ? /^\+?(0|[1-9]\d*)$/ :  /^\+?[1-9]\d*$/;
        return regexp.test(stringNumber);
    }

    // ---------------- BEGIN: VALIDATORS ----------------------- //
    
    nullOrWhiteSpaceValidator(control: FormControl):{[s: string]: boolean} {
        if(control.value == null 
            || control.value.length === 0 
            || (control.value.trim().length === 0) ){
                return {'nullOrWhiteSpace': true};
            }
            return null;
    }

    // ---------------- END: VALIDATORS ----------------------- //
}