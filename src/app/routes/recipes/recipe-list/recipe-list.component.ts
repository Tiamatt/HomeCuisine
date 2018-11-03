import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../../../shared/services/apis.service';
import { RecipeShortModel } from './../../../shared/models/recipe-short';
import { BaseComponent } from './../../../core/BaseComponent';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent extends BaseComponent implements OnInit {
  title: string;
  recipes: RecipeShortModel[];
  private selectedGroup: string;
  private selectedCategoryId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apisService: ApisService,
    private spinner: NgxSpinnerService,
  ) {
    super();
  }

  private callAllPromises() {
    this.spinner.show();
    if(this.selectedCategoryId && this.selectedCategoryId > 0){
      Promise.all([
        this.apisService.getRecipesByCategory(this.selectedCategoryId),
        this.apisService.getCategory(this.selectedCategoryId),
      ])
      .then((res) => {
        this.setRecipes(res[0]);
        this.setTitle(res[1]);
        this.spinner.hide();
      });
    } else {
      this.setTitle(null);
      this.spinner.hide();
    }
  }

  private setRecipes(res: RecipeShortModel[] | null){
    this.recipes = res;
  }

  private setTitle(category: any) {
    if(category && category['name']){
          this.title = category['name'] + ' recipes';
    }
    if(this.selectedGroup) {
      switch(this.selectedGroup) {
        case 'favorite':
          this.title = "Your Favorite recipes";
          break;
        case 'user-recipes':
          this.title = "Your recipes";
          break;
        default:
          this.title = "Popular recipes";
          break;
      }
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedGroup = (params['group']) ? params['group'] : null;
      this.selectedCategoryId = (params['categoryId'] && !isNaN(params['categoryId'])) ? + params['categoryId'] : null;
      this.callAllPromises();
    });
  }

}
