import { HttpErrorResponse } from '@angular/common/http';
export class BaseComponent {
    
    constructor() {
    }

    isStringPositiveNumber(stringNumber:string, isIcludeZero: boolean = false){
        let regexp = (isIcludeZero) ? /^\+?(0|[1-9]\d*)$/ :  /^\+?[1-9]\d*$/;
        return regexp.test(stringNumber);
    }
}