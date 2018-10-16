import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BaseComponent } from './../../../../../core/BaseComponent';
import { GeneralService } from './../../../../../shared/services/general.service';
import { FiltersService } from './../../../../../shared/services/filters.service';

@Component({
  selector: 'ingredients-add',
  templateUrl: './ingredients-add.component.html',
  styleUrls: ['./ingredients-add.component.scss']
})
export class IngredientsAddComponent extends BaseComponent implements OnInit {

  igredients: Array<any>;
  selectedIngredientId: number = -1;
  measures: Array<any>;
  selectedMeasureId: number = -1;
  selectedMeasureValue: number = null;
  results: any;

  constructor(
    private filtersService: FiltersService,
    private generalService: GeneralService,
    private spinner: NgxSpinnerService,
    private toastrManager: ToastrManager,
    private ngxSmartModalService: NgxSmartModalService,
    ) { 
      super();
    }

  private setMeasures() {
    this.filtersService.getMeasures().subscribe(
      res => {
        this.measures = res.map(item => {
          return {
            id: item['id'],
            name: item['name']
          };
        });
      },
      err => {
        console.log(err);
        this.generalService.saveError(err).subscribe();
        this.toastrManager.errorToastr('Can not load data for measure. Please, try later.', 'Ooops!', { position: "top-right", dismiss:"click", showCloseButton: true});
      }
    );
  }
  private setIngredients() {
    this.filtersService.getIngredients().subscribe(
      res => {
        this.igredients = res.map(item => {
          return {
            id: item['id'],
            name: item['name']
          };
        });
      },
      err => {
        console.log(err);
        this.generalService.saveError(err).subscribe();
        this.toastrManager.errorToastr('Can not load data for ingrediens. Please, try later.', 'Ooops!', { position: "top-right", dismiss:"click", showCloseButton: true});
      }
    );
  }

  onSaveIngredient($event){
    this.ngxSmartModalService.getModal('myModal').close();
  }

  onIngredientSelected(selectedIngredientId){
    console.log({
      'kaliLog_1': selectedIngredientId,
    });
  }
  onMeasureValueChange(selectedMeasureValue) {
    console.log({'kaliLog_2': selectedMeasureValue});
  }
  onMeasureSelected(selectedMeasureId){
    console.log({
      'kaliLog_3': selectedMeasureId,
    });
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