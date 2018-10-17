import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseComponent } from './../../../../core/BaseComponent';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApisService } from './../../../../shared/services/apis.service';
import { NullOrWhiteSpaceValidatorDirectiveFn } from 'src/app/shared/directives/null-or-white-space-validator.directive';
import { UniqueInDbValidatorDirectiveFn } from 'src/app/shared/directives/unique-in-db-validator.directive';
import { FilterModel } from './../../../../shared/models/filter.model';

@Component({
  selector: 'ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})

// Add new ingredient (by name)
export class IngredientEditComponent extends BaseComponent implements OnInit {
  @Output() onSaveIngredient = new EventEmitter<FilterModel>();
  ingredientFormGroup: FormGroup;

  constructor(
    private apisService: ApisService,
    private toastrManager: ToastrManager,
  ) {
    super();
   }

  private setIngredientFormGroup() {
    this.ingredientFormGroup = new FormGroup({
      'name': new FormControl(
        null, 
        [NullOrWhiteSpaceValidatorDirectiveFn()], // array of sync validators
        [UniqueInDbValidatorDirectiveFn(this.apisService, 'ingredient')]),// array of async validators
    });
  }

  onSubmit() {
    this.apisService.saveIngredient(this.ingredientFormGroup.value).subscribe(
      res => {
        this.toastrManager.successToastr("Ingredient have been saved successfully", "Saved");
        let newIngredient = new FilterModel(res['name'], res['id']);
        this.onSaveIngredient.emit(newIngredient);
      },
      err => {
        this.toastrManager.errorToastr("Couldn't save new ingredient", "Ooops!");
        this.onSaveIngredient.emit(null);
        this.apisService.saveError(err);
      }
    );
  }

  ngOnInit() {
    this.setIngredientFormGroup();
  }

}
