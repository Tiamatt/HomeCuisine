import { Component, OnInit, Input} from '@angular/core';
import { BaseComponent } from './../../../../core/BaseComponent';
import { RecipeShortModel } from './../../../../shared/models/recipe-short';

@Component({
  selector: 'recipe-panel',
  templateUrl: './recipe-panel.component.html',
  styleUrls: ['./recipe-panel.component.scss']
})
export class RecipePanelComponent extends BaseComponent implements OnInit {
  @Input() recipe: RecipeShortModel;

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
