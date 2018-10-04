import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  selectedGroup: string;
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
    });
  }

}
