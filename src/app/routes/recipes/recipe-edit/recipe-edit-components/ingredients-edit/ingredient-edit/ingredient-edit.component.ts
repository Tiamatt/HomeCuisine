import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { MeasureService } from '../../../../../../shared/services/measure.service';

@Component({
  selector: 'ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {
  igredients: Array<any>;
  selectedIngredientId: number = -1;
  measures: Array<any>;
  selectedMeasureId: number = -1;
  selectedMeasureValue: number = null;
  results: any;

  constructor(
    private measureService: MeasureService,
    private spinner: NgxSpinnerService,
    ) { }

  private setMeasures() {
    this.measureService.getMeasures().subscribe(
      res => {
        this.measures = res.map(x => {
          return {
            id: x['id'],
            name: x['name']
          };
        })
      },
      err => {
        console.log(err); // kali!
      }
    );
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
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.igredients = [
        {id:1, name: "ingredient1"},
        {id:2, name: "ingredient2"},
        {id:3, name: "ingredient3"},
        {id:4, name: "tes"},
      ];
    }, 5000);
    
  }

}
