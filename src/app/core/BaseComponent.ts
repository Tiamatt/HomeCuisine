import { FilterModel } from './../shared/models/filter.model';
import { Base } from './Base';
export class BaseComponent extends Base {
    // dont add anything to constructor
    constructor() {
        super();
    }

    public getFilterNameByFilterValue(filterArray: FilterModel[], selectedValue: string) {
        let result = filterArray.find(x => x.value == selectedValue);
        return result.name;
      }
}