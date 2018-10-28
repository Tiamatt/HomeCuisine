import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from './../../../core/BaseComponent';
import { ApisService } from './../../services/apis.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FilterModel } from './../../models/filter.model';

@Component({
  selector: 'multiselect-dropdown-with-create',
  templateUrl: './multiselect-dropdown-with-create.component.html',
  styleUrls: ['./multiselect-dropdown-with-create.component.scss']
})
export class MultiselectDropdownWithCreateComponent extends BaseComponent implements OnChanges {
  @Input() entityName: string = 'category';
  @Input() selectedOptions: FilterModel[] = [];
  @Output() OnSelectionChanged = new EventEmitter<FilterModel[]>();
  options: FilterModel[] = [];
  selectedOption: string = "-1";

  constructor(
    private apisService: ApisService,
    private toastrManager: ToastrManager,
    private ngxSmartModalService: NgxSmartModalService,
  ) { 
    super();
  }

  private setOptions() {
    this.apisService.getFilter(this.entityName).then(
      (res: FilterModel[]) => {
        let selectedValues = this.selectedOptions.map(option => option.value);
        this.options = res.map(option => { 
          option.selected = (selectedValues.indexOf(option.value) != -1);
          return option;
        });
      }
    );
  }

  private passChangesToOutput() {
    this.selectedOptions = this.options.filter(option => option.selected === true);
    this.OnSelectionChanged.emit(this.selectedOptions);
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
    this.setOptions();
  }

}
