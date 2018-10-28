import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { BaseComponent } from './../../../../core/BaseComponent';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DirectionModel } from './../../../../shared/models/direction.model';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'directions-panel',
  templateUrl: './directions-panel.component.html',
  styleUrls: ['./directions-panel.component.scss']
})
export class DirectionsPanelComponent extends BaseComponent implements OnChanges {
  @Input() selections: DirectionModel[] = [];
  @Output() OnSelectionsChanges = new EventEmitter<DirectionModel[]>(); 
  selectedDescription: string  = null;
  sortNumber: number = 1;

  constructor(
    private toastrManager: ToastrManager,
  ) { 
    super();
  }

  private addSelectionIntoList(): void {
    let guid = (Guid.create())['value'];

    let item = new DirectionModel(
      guid,
      this.sortNumber++,
      this.selectedDescription.trim(),
    );

    this.selections.push(item);
    this.OnSelectionsChanges.emit(this.selections);
  }

  private removeSelectionFromList(id: string): void {
    let sortOrderOfRemovedSelection = this.selections.find(x =>x.id == id).sortNumber;
    this.selections = this.selections.filter(x => x.id != id);
    // reset sortNumber for bottom selections
    this.selections.forEach(x =>  {
      x.sortNumber = (x.sortNumber> sortOrderOfRemovedSelection) ? x.sortNumber - 1: x.sortNumber;
    });
    // reset sortNumber
    this.sortNumber--;
    this.OnSelectionsChanges.emit(this.selections);
  }

  private resetSelection(): void {
    this.selectedDescription = null;
  }


  onAdd(){
    if (this.isNullOrWhiteSpace(this.selectedDescription)) {
      this.toastrManager.warningToastr("Please, type description", "Wait!");
    } else  {
      this.addSelectionIntoList();
      this.resetSelection();
    }
  }

  onRemove(id: string){
    this.removeSelectionFromList(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.selections) {
      this.sortNumber = this.selections.length + 1;
    }
  }

}
