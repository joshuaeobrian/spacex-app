import {Component, OnInit, Input} from '@angular/core';
import {Launch} from '../launch-table.model';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {
  @Input()
  launch: Launch;
  errorOnPress = false;

  /**
   * @description when a user clicks on a row we check to see if there is a press kit then we open a new tab with the press kit
   */
  onRowClick() {
    const presskit = this.launch.links.presskit;
    if (presskit) {
      window.open(presskit, '_blank');
    } else {
      this.errorOnPress = true;
    }
  }

  closeError() {
    this.errorOnPress = false;
  }

}
