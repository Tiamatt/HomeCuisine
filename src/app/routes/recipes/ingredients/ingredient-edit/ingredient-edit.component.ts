import { NameValueCheckedModel } from './../../../../shared/models/name-value-checked.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { BaseComponent } from './../../../../core/BaseComponent';
import { RecipesService } from './../../../../shared/services/recipes.service';

@Component({
  selector: 'ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})

// Add new ingredient (by name)
export class IngredientEditComponent extends BaseComponent implements OnInit {
  @Output() onSaveIngredient = new EventEmitter<NameValueCheckedModel>();
  ingredientFormGroup: FormGroup;

  constructor(
    private recipesService: RecipesService,
    private toastrManager: ToastrManager,
  ) {
    super();
   }

  private setIngredientFormGroup() {
    this.ingredientFormGroup = new FormGroup({
      'name': new FormControl(null),
    });
  }

  onSubmit() {
    this.recipesService.saveIngredient(this.ingredientFormGroup.value).subscribe(
      res => {
        this.toastrManager.successToastr("Ingredient have been saved successfully", "Saved");
        let newIngredient = new NameValueCheckedModel( res['name'], res['id']);
        this.onSaveIngredient.emit(newIngredient);
      },
      err => {
        this.toastrManager.errorToastr("Couldn't save new ingredient", "Ooops!");
        this.onSaveIngredient.emit(null);
        // kali - save error in db
      }
    );
  }

  ngOnInit() {
    this.setIngredientFormGroup();
  }

}
