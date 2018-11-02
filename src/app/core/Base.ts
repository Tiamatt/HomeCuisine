export class Base {
    // dont put anything in constructor
    constructor() {}

    public isStringPositiveNumber(target: string, isIcludeZero: boolean = false){
        let regexp = (isIcludeZero) ? /^\+?(0|[1-9]\d*)$/ :  /^\+?[1-9]\d*$/;
        return regexp.test(target);
    }

    public isNullOrWhiteSpace(target: string) {
        let isNotNullOrWhiteSpace = (target && target.length > 0 &&  target.trim().length > 0)
        return !isNotNullOrWhiteSpace;
    }
    
    public convertMinutesIntoHoursAndMinutes(mins: number): {'hours': number, 'minutes': number} {
        let hours = (mins && mins>0) ? Math.floor(mins/60) : null;
        let minutes = (mins && mins>0) ? mins % 60 : null;
        return {
            'hours': hours,
            'minutes': minutes,
        };
    }
    

}