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

  igredients: Array<any>;
  selectedIngredientId: number = -1;
  measures: Array<any>;
  selectedMeasureId: number = -1;
  selectedMeasureValue: number = null;
  results: any;

  constructor(
    private apisService: ApisService,
    private spinner: NgxSpinnerService,
    private toastrManager: ToastrManager,
    private ngxSmartModalService: NgxSmartModalService,
    ) { 
      super();
    }

  private setMeasures() {
    this.apisService.getFilter('measure').then(
      res => {
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
  private setIngredients() {
    this.apisService.getFilter('ingredient').then(
      res => {
        this.igredients = res;
      })
      .catch(
        err => {
          this.apisService.saveError(err).subscribe();
          this.toastrManager.errorToastr('Can not load data for ingrediens. Please, try later.', 'Ooops!', { position: "top-right", dismiss:"click", showCloseButton: true});
        }
      );
  
  }

  onSaveIngredient($event){
    console.log({'kaliLog_onSaveIngredient': $event});
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