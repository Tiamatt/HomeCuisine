import { IngredientModel } from './../../../../../shared/models/ingredient.model';
import { FilterModel } from './../../../../../shared/models/filter.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BaseComponent } from './../../../../../core/BaseComponent';
import { ApisService } from './../../../../../shared/services/apis.service';

@Component({
  selector: 'ingredients-add',
  templateUrl: './ingredients-add.component.html',
  styleUrls: ['./ingredients-add.component.scss']
})
export class IngredientsAddComponent extends BaseComponent implements OnInit {
  igredients: FilterModel[];
  selectedIngredientValue: string = "-1";
  selectedAmount: string = null;
  measures: FilterModel[];
  selectedMeasureValue: string = "-1";
  results: any;
  items: IngredientModel[] = [];

  constructor(
    private apisService: ApisService,
    private spinner: NgxSpinnerService,
    private toastrManager: ToastrManager,
    private ngxSmartModalService: NgxSmartModalService,
    ) { 
      super();
    }

  private setMeasures(): void {
    this.apisService.getFilter('measure').then(
      (res : FilterModel[]) => {
        if(res == null) {
          throw new Error('Kali - blabla error'); // kali
        }
        this.measures = res;
      }
    )
    .catch(
      err => {
        this.apisService.saveError(err).subscribe();
        this.toastrManager.errorToastr('Can not load data for measure. Please, try later.', 'Ooops!', { position: "top-right", dismiss:"click", showCloseButton: true});
      }
    );
  }

  private setIngredients(): void {
    this.apisService.getFilter('ingredient').then(
      (res : FilterModel[]) => {
        if(res == null) {
          throw new Error('Kali - blabla error'); // kali
        }
        this.igredients = res;
      })
      .catch(
        err => {
          this.apisService.saveError(err).subscribe();
          this.toastrManager.errorToastr('Can not load data for ingrediens. Please, try later.', 'Ooops!', { position: "top-right", dismiss:"click", showCloseButton: true});
        }
      );
  
  }

  private getFilterNameByFilterValue(filterArray: FilterModel[], selectedValue: string) {
    let result = filterArray.find(x => x.value == selectedValue);
    return result.name;
  }

  onSaveIngredient($event: FilterModel){
    this.setIngredients();
    this.selectedIngredientValue = $event.value;
    this.ngxSmartModalService.getModal('myModal').close();
  }

  onCancelIngredient() {
    this.ngxSmartModalService.getModal('myModal').close();
  }

  onDataLoad() {
    if(this.measures && this.igredients) {
      this.spinner.hide();
      return true;
    } else {
      this.spinner.show();
      return false;
    }
  }

  onAdd(){
    if (this.selectedIngredientValue == "-1") {
      this.toastrManager.warningToastr("Please, select ingredient", "Wait!");
    } else if (this.isNullOrWhiteSpace(this.selectedAmount)) {
      this.toastrManager.warningToastr("Please, type amount", "Wait!");
    } else if (this.selectedMeasureValue == "-1") {
      this.toastrManager.warningToastr("Please, select measure", "Wait!");
    } else  {
      let d = new IngredientModel(
        this.getFilterNameByFilterValue(this.igredients, this.selectedIngredientValue),
        this.selectedIngredientValue,
        this.selectedAmount,
        this.getFilterNameByFilterValue(this.measures, this.selectedMeasureValue),
        this.selectedMeasureValue,
      );
      this.items.push(d);
      console.log(this.items);
    }
  }

  ngOnInit() {
    this.setMeasures();
    this.setIngredients();
    // this.igredients = [
    //   // {id:1, name: "ingredient1"},
    // ];
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.igredients = [
    //     {id:1, name: "ingredient1"},
    //     {id:2, name: "ingredient2"},
    //     {id:3, name: "ingredient3"},
    //     {id:4, name: "tes"},
    //   ];
    // }, 5000);
    
  }

}