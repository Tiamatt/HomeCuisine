import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from './../../../shared/services/apis.service';
import { RecipeShortModel } from './../../../shared/models/recipe-short';
import { BaseComponent } from './../../../core/BaseComponent';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent extends BaseComponent implements OnInit {
  recipes: RecipeShortModel[];
  selectedGroup: string;
  selectedCategoryId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apisService: ApisService,
  ) {
    super();
  }

  private setRecipes(){
    this.apisService.getRecipesByCategory(10).subscribe(
      (res: RecipeShortModel[] | null) => {
        this.recipes = res;
      } 
    );
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedGroup = (params['group']) ? params['group'] : null;
      this.selectedCategoryId = (params['categoryId']) ? params['categoryId'] : null;
      this.setRecipes();
    });
  }

}
