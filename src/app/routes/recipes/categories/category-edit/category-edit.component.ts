import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from './../../../../core/BaseComponent';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApisService } from './../../../../shared/services/apis.service';
import { NullOrWhiteSpaceValidatorDirectiveFn } from 'src/app/shared/directives/null-or-white-space-validator.directive';
import { UniqueInDbValidatorDirectiveFn } from 'src/app/shared/directives/unique-in-db-validator.directive';
import { FilterModel } from './../../../../shared/models/filter.model';


@Component({
  selector: 'category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent extends BaseComponent implements OnInit {
  @Output() OnSave = new EventEmitter<FilterModel>();
  @Output() OnCancel = new EventEmitter<void>(); 
  categoryFormGroup: FormGroup;

  constructor(
    private apisService: ApisService,
    private toastrManager: ToastrManager,
  ) {
    super();
   }

  private setCategoryFormGroup(): void {
    this.categoryFormGroup = new FormGroup({
      'name': new FormControl(
        null, // default value
        [Validators.minLength(2), Validators.maxLength(128), NullOrWhiteSpaceValidatorDirectiveFn()], // array of sync validators
        [UniqueInDbValidatorDirectiveFn(this.apisService, 'category', 0)] // array of async validators
      ),
    });
  }

  onSave(): void {
    this.apisService.saveCategory(this.categoryFormGroup.value).subscribe(
      res => {
        this.toastrManager.successToastr("Category have been saved successfully", "Saved");
        this.OnSave.emit(new FilterModel(res['name'], res['id'].toString(), true));
        this.categoryFormGroup.reset();
      },
      err => {
        this.toastrManager.errorToastr("Couldn't save new category", "Ooops!");
        this.OnSave.emit(null);
        this.apisService.saveError(err);
      }
    );
  }

  onCancel(): void {
    this.OnCancel.emit();
  }

  ngOnInit() {
    this.setCategoryFormGroup();
  }

}
