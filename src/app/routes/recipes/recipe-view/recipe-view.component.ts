import { ToastrManager } from 'ng6-toastr-notifications';
import { ApisService } from './../../../shared/services/apis.service';
import { BaseComponent } from './../../../core/BaseComponent';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeModel } from './../../../shared/models/recipe.model';
import { Component, OnInit } from '@angular/core';
import { IngredientModel } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent extends BaseComponent implements OnInit {
  recipe: RecipeModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apisService: ApisService,
    private toastrManager: ToastrManager,
    private router: Router,
  ) { 
    super();
  }

  private setRecipe() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let recipeId = (this.isStringPositiveNumber(params['id'])) ? params['id'] : null;
        this.apisService.getRecipe(recipeId).subscribe(
          (res: RecipeModel) => {
            this.recipe = res;
            this.sortArrayOfObjectsByNumericKey(this.recipe.directions, "sortNumber");
          },
          err => {
            this.toastrManager.errorToastr("Error occure while calling recipe", "Ooops!");
            this.apisService.saveError(err);
          });
      },
      err => {
        // developer's error
        this.toastrManager.errorToastr("Couldn't get recipe id from activated route", "Ooops!");
        this.apisService.saveError(err);
      });
  }

  onCheckIngredient(ingredient: IngredientModel) {
    ingredient.flag = !ingredient.flag;
  }

  onRedirectToEditPage(){
    this.router.navigate(['/recipe/' + this.recipe.id + '/edit']);
  }

  onRedirectToCreatePage(){
    this.router.navigate(['/recipe/new']);
  }

  ngOnInit() {
    this.setRecipe();
  }

}
