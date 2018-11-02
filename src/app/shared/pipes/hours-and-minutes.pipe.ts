import { Pipe, PipeTransform } from '@angular/core';
import { Base } from './../../core/Base';
/*
Take minutes as number as input
Converts and returns hours and minutes string value
If convertion failed it returns input
Example {{ 90 : hoursAndMinutes }} formats to "1 h 30 m"
 */
@Pipe({
  name: 'hoursAndMinutes'
})
export class HoursAndMinutesPipe extends Base implements PipeTransform {

  transform(mins: number): string {
      if(mins == null || isNaN(mins) || mins<1) {
        return mins + '';
      }
      let convertedTime = this.convertMinutesIntoHoursAndMinutes(mins);
      if(convertedTime.hours>=0 && convertedTime.minutes>=0) {
      return convertedTime.hours + ' h ' + convertedTime.minutes + ' m';
    }
  }

}
