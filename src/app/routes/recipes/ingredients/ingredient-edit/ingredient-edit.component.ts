import { RecipesService } from './../../../../shared/services/recipes.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {
  ingredientFormGroup: FormGroup;

  constructor(
    private recipesService: RecipesService
  ) { }

  private setIngredientFormGroup() {
    this.ingredientFormGroup = new FormGroup({
      'name': new FormControl(null),
    });
  }

  onSubmit() {
    this.recipesService.saveIngredient(this.ingredientFormGroup.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.setIngredientFormGroup();
  }

}
