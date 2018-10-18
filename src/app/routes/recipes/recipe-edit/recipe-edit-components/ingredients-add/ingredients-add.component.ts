import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BaseComponent } from './../../../../../core/BaseComponent';
import { ApisService } from './../../../../../shared/services/apis.service';
import { Guid } from 'guid-typescript';
import { IngredientModel } from './../../../../../shared/models/ingredient.model';
import { FilterModel } from './../../../../../shared/models/filter.model';

@Component({
  selector: 'ingredients-add',
  templateUrl: './ingredients-add.component.html',
  styleUrls: ['./ingredients-add.component.scss']
})
export class IngredientsAddComponent extends BaseComponent implements OnInit {
  @Output() OnSelectionsChanges = new EventEmitter<IngredientModel[]>();
  selections: IngredientModel[] = []; // selected ingredient + amount + measure
  ingredients: FilterModel[];
  selectedIngredientValue: string = "-1";
  selectedAmount: string = null;
  measures: FilterModel[];
  selectedMeasureValue: string = "-1";

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

  private changeIngredientFlag() {
    let selectedIngredientValues = this.selections.map(x => x.ingredientValue);
    this.ingredients.forEach(x => x.selected = (selectedIngredientValues.indexOf(x.value) === -1) );
  }

  private setIngredients(): void {
    this.apisService.getFilter('ingredient').then(
      (res : FilterModel[]) => {
        if(res == null) {
          throw new Error('Kali - blabla error'); // kali
        }
        this.ingredients = res;
        this.changeIngredientFlag();
      })
      .catch(
        err => {
          this.apisService.saveError(err).subscribe();
          this.toastrManager.errorToastr('Can not load data for ingrediens. Please, try later.', 'Ooops!', { position: "top-right", dismiss:"click", showCloseButton: true});
        }
      );
  
  }

  private addSelectionIntoList(): void {
    let guid = (Guid.create())['value'];

    let item = new IngredientModel(
      guid,
      this.getFilterNameByFilterValue(this.ingredients, this.selectedIngredientValue),
      this.selectedIngredientValue,
      this.selectedAmount.trim(),
      this.getFilterNameByFilterValue(this.measures, this.selectedMeasureValue),
      this.selectedMeasureValue,
    );

    this.selections.push(item);
    this.OnSelectionsChanges.emit(this.selections);
  }

  private removeSelectionFromList(id: string): void {
    this.selections = this.selections.filter(x => x.id != id);
    this.OnSelectionsChanges.emit(this.selections);
  }

  private resetSelection(): void {
    this.selectedIngredientValue = "-1";
    this.selectedAmount = null;
    this.selectedMeasureValue = "-1";
  }

  onSaveIngredient($event: FilterModel) {
    this.selectedIngredientValue = $event.value;
    this.setIngredients();
    this.ngxSmartModalService.getModal('myModal').close();
  }

  onCancelIngredient() {
    this.ngxSmartModalService.getModal('myModal').close();
  }

  onDataLoad() {
    if(this.measures && this.ingredients) {
      this.spinner.hide();
      return true;
    } else {
      this.spinner.show();
      return false;
    }
  }

  onAdd(){
    if (this.selectedIngredientValue == "-1") {
      this.toastrManager.warningToastr("Please, select ingredient first", "Wait!");
    } else if (this.isNullOrWhiteSpace(this.selectedAmount)) {
      this.toastrManager.warningToastr("Please, type amount first", "Wait!");
    } else if (this.selectedMeasureValue == "-1") {
      this.toastrManager.warningToastr("Please, select measure first", "Wait!");
    } else  {
      this.addSelectionIntoList();
      this.resetSelection();
      this.changeIngredientFlag();
    }
  }

  onRemove(id: string){
    this.removeSelectionFromList(id);
    this.changeIngredientFlag();
  }

  ngOnInit() {
    this.setMeasures();
    this.setIngredients();    
  }

}