import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sudoku, SudokuCell } from './../../../models/sudoku.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() sudoku: Sudoku;
  @Input() activeCell?: SudokuCell;
  @Input() showAnswer: boolean;
  @Output() activeCellChange = new EventEmitter<SudokuCell>();
  Math = Math;

  onFieldClick(field: SudokuCell): void {
    this.activeCell = this.activeCell === field ? undefined : field;
    this.activeCellChange.emit(this.activeCell);
  }

  get currentRow(): number {
    return this.sudoku.findIndex(row => row.indexOf(this.activeCell) !== -1);
  }

  get currentCol(): number {
    if (!this.activeCell || this.currentRow === -1) {
      return -1;
    }
    return this.sudoku[this.currentRow].indexOf(this.activeCell);
  }
}
