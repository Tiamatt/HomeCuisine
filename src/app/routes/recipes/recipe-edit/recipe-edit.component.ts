import { ImageUploaderAndCropperComponent } from './../../../shared/components/image-uploader-and-cropper/image-uploader-and-cropper.component';
import { IngredientModel } from './../../../shared/models/ingredient.model';
import { UniqueInDbValidatorDirectiveFn } from 'src/app/shared/directives/unique-in-db-validator.directive';
import { NullOrWhiteSpaceValidatorDirectiveFn } from 'src/app/shared/directives/null-or-white-space-validator.directive';
import { RecipeModel } from './../../../shared/models/recipe.model';
import { ApisService } from './../../../shared/services/apis.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../core/BaseComponent';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent extends BaseComponent implements OnInit {
  initialRecipe: RecipeModel;
  isInitialFrontImage: boolean;
  recipeFormGroup: FormGroup;
  isInvalid: boolean = false;
  @ViewChild(ImageUploaderAndCropperComponent) imageUploaderAndCropperComponent: ImageUploaderAndCropperComponent;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private toastrManager: ToastrManager,
      private apisService: ApisService,
    ){
    super();
  }

  private setRecipe() : void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let recipeId = (this.isStringPositiveNumber(params['id'])) ? params['id'] : null;
        if(recipeId) {
            this.apisService.getRecipe(recipeId).subscribe(
              (res: RecipeModel) => {
                this.initialRecipe = res;
                this.isInitialFrontImage = true;
                this.setRecipeFormGroup();
              },
              err => {
                this.toastrManager.errorToastr("Error occure while calling recipe", "Ooops!");
                this.apisService.saveError(err);
              });
        } else {
            this.initialRecipe = new RecipeModel(null, null, [], null);
            this.isInitialFrontImage = false;
            this.setRecipeFormGroup();
        }
      },
      err => {
        // developer's error
        this.toastrManager.errorToastr("Couldn't get recipe id from activated route", "Ooops!");
        this.apisService.saveError(err);
      });
  }

  private setRecipeFormGroup() : void {
    this.recipeFormGroup = new FormGroup({
      'name': new FormControl(
        this.initialRecipe.name, // default value
        [NullOrWhiteSpaceValidatorDirectiveFn()], // array of sync validators
        [UniqueInDbValidatorDirectiveFn(this.apisService, 'recipe')] // array of async validators
        ),
      'frontImage': new FormControl(
        this.initialRecipe.frontImage, 
        Validators.required),
      'ingredients': new FormControl(
        this.initialRecipe.ingredients.slice(), 
        Validators.required),
    });

    console.log({'kaliLog_setRecipeFormGroup': this.initialRecipe});
  }

  onImageUploadedAndCropped(event: string){
    this.recipeFormGroup.patchValue({'frontImage': event});
    this.isInitialFrontImage = false;
  }

  onIngredientsChanges(event: IngredientModel[]){
    this.recipeFormGroup.patchValue({'ingredients': event});
  }

  onSave(): void {
    console.log({
      'kaliLog_onSave': 'bla',
      'initialRecipe': this.initialRecipe,
      'form': this.recipeFormGroup.value
    });
    this.isInvalid = !this.recipeFormGroup.valid;
    if(this.isInvalid) {
      this.toastrManager.warningToastr("Validation failed. Please, read text marked red.", "Warning!");
    }
    else {
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
  }

  onClearOrCancel() {
    this.isInitialFrontImage = true;
    this.setRecipeFormGroup();
    this.imageUploaderAndCropperComponent.onReset();
  }

  ngOnInit() {
    this.setRecipe();
  }

}
