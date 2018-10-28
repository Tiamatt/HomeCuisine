import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from './../../../core/BaseComponent';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FilterModel } from './../../models/filter.model';

@Component({
  selector: 'multiselect-dropdown-with-create',
  templateUrl: './multiselect-dropdown-with-create.component.html',
  styleUrls: ['./multiselect-dropdown-with-create.component.scss']
})
export class MultiselectDropdownWithCreateComponent extends BaseComponent implements OnChanges {
  @Input() options: FilterModel[] = [];
  @Output() OnSelectionChanged = new EventEmitter<FilterModel[]>();
  selectedOption: string = "-1";

  constructor(
    private toastrManager: ToastrManager,
    private ngxSmartModalService: NgxSmartModalService,
  ) { 
    super();
  }

  private passChangesToOutput() {
    let selections = this.options.filter(option => option.selected === true);
    this.OnSelectionChanged.emit(selections);
  }

  onSelected(selectedValue: string) {
    this.options.forEach(option => {
      if(option.value == selectedValue) {
        option.selected = true;
      }
    });
    this.passChangesToOutput();
  }

  onRemove(option: FilterModel) {
    option.selected = false;
    this.selectedOption = '-1';
    this.passChangesToOutput();
  }

  ngOnChanges() {
  }

}
