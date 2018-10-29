import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  selectedGroup: string;
  selectedCategoryId: string;
  constructor(private activatedRoute: ActivatedRoute) {
   }

  // private setSelectedGroup() {
  //   let queryParams = this.activatedRoute.snapshot.queryParams;
  //   this.selectedGroup = (queryParams['group']) ? queryParams['group'] : null;
  //   console.log({'kaliLog': this.selectedGroup});
  // }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedGroup = (params['group']) ? params['group'] : null;
      this.selectedCategoryId = (params['categoryId']) ? params['categoryId'] : null;
    });
  }

}
