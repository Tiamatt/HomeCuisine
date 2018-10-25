import { BaseComponent } from './../../../../core/BaseComponent';
import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'preparation-time-panel',
  templateUrl: './preparation-time-panel.component.html',
  styleUrls: ['./preparation-time-panel.component.scss']
})
export class PreparationTimePanelComponent extends BaseComponent implements OnChanges {
  @Input() preparationTimeInMinutes: number;
  @Output() OnPreparationTimeChanged = new EventEmitter<number>();
  hours: number;
  minutes: number;

  constructor() { 
    super();
  }

  private setHoursAndMinutes(): void {
    let convertedTime = this.convertMinutesIntoHoursAndMinutes(this.preparationTimeInMinutes);
    this.hours = convertedTime.hours;
    this.minutes = convertedTime.minutes;
  }

  private setAndEmitPreparationTime(): void {
    if(this.hours>=0 && this.hours<=32 && this.minutes>=0 && this.minutes<=59) {
      this.preparationTimeInMinutes = this.hours*60 + this.minutes;
    } else {
      this.preparationTimeInMinutes = null;
    }
    this.OnPreparationTimeChanged.emit(this.preparationTimeInMinutes);
  }

  onHoursChange(event: number) {
    this.hours = event;
    this.setAndEmitPreparationTime();
  }

  onMinutesChange(event: number) {
    this.minutes = event;
    this.setAndEmitPreparationTime();
  }

  ngOnChanges(changes: SimpleChanges) {
      this.setHoursAndMinutes();
  }

}
