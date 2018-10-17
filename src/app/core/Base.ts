export class Base {
    // dont put anything in constructor
    constructor() {}

    isStringPositiveNumber(target: string, isIcludeZero: boolean = false){
        let regexp = (isIcludeZero) ? /^\+?(0|[1-9]\d*)$/ :  /^\+?[1-9]\d*$/;
        return regexp.test(target);
    }

    isNullOrWhiteSpace(target: string) {
        let isNotNullOrWhiteSpace = (target && target.length > 0 &&  target.trim().length > 0)
        return !isNotNullOrWhiteSpace;
    }

}