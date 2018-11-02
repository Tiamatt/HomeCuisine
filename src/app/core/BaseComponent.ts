import { FilterModel } from './../shared/models/filter.model';
import { Base } from './Base';
export class BaseComponent extends Base {
    // dont add anything to constructor
    constructor() {
        super();
    }

    public getFilterNameByFilterValue(filterArray: FilterModel[], selectedValue: string): string {
        let result = filterArray.find(x => x.value == selectedValue);
        return result.name;
    }

    public sortArrayOfObjectsByNumericKey(arrayOfObjects: Array<any>, objectKeyName: string): Array<any>{
        arrayOfObjects.sort((a, b) => a[objectKeyName] < b[objectKeyName] ? -1 : a[objectKeyName] > b[objectKeyName] ? 1 : 0);
        return arrayOfObjects;
    }
}