import { ApisService } from './../../../shared/services/apis.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../../../core/BaseComponent';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent extends BaseComponent implements OnInit {
  recipeId: number = null; // if null, then "new", otherwise "edit"
  recipe: any;
  recipeFormGroup: FormGroup;
  loaded: boolean = false;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private toastrManager: ToastrManager,
      private apisService: ApisService,
    ){
    super();
  }

  private setRecipeId(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.recipeId = (this.isStringPositiveNumber(params['id'])) ? params['id'] : null;
            resolve();
        },
        error => {
          reject(error);
        });
    });
  }

  private setRecipe(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if(this.recipeId === null) {
        this.recipe = { // kali - add more
          name: '', 
        }
        resolve();
      } else {
        // call api and set this.recipe = res;
        // this.recipe = {'kaliTestRecipe': 'Edit'};
        // resolve();
      }
    });
  }

  private setRecipeForm() { // kali - rename
    this.recipeFormGroup = new FormGroup({
      'name': new FormControl(this.recipe['name']),
      'frontImage': new FormControl(null),
      'ingredients': new FormControl(null),
    });
  }

  onImageUploadedAndCropped(event){
    this.recipeFormGroup.patchValue({
        'frontImage': event
    });
  }

  onIngredientsChanges($event){
    this.recipeFormGroup.patchValue({
      'ingredients': $event
    });
  }

  onSave(): void {
    this.apisService.saveRecipe(this.recipeFormGroup.value).subscribe(
      (newRecipeId: number) => {
        this.toastrManager.successToastr("Your recipe have been saved successfully", "Saved");
        this.router.navigate(['/recipe/' + newRecipeId + '/view']);
      },
      err => {
        this.toastrManager.errorToastr("Error occured during saving the recipe", "Ooops!");
        this.apisService.saveError(err);
      }
    );
  }

  onClear() {
    this.recipeFormGroup.reset();
  }

  ngOnInit() {
     // 1. set editRecipeId. If null, then "new"
    this.setRecipeId().then(  
      () => {
        // 2. set initial value for recipe for "edit", null for "new"
        this.setRecipe().then(
          () => {
            this.setRecipeForm();
            this.loaded = true;
          },
          err => console.log(err), // kali
        );
      },
      err => console.log(err), // kali
    );
  }

}
