import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Sudoku, SudokuCell } from './../../models/sudoku.model';
import { DigitButton } from './../../models/sudoku.model';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent implements OnInit, OnChanges {
  @Input() sudoku: Sudoku;
  @Output() stopTimer = new EventEmitter<boolean>();

  activeCell?: SudokuCell;
  notesOn = false;
  showAnswer = false;
  controlButtons: DigitButton[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 9; i++) {
      this.controlButtons.push({ value: i });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sudoku) {
      this.activeCell = undefined;
      this.showAnswer = false;
      this.notesOn = false;
      this.resetButtons();
    }
  }

  @HostListener('window:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.changeFocus(0, -1);
        break;
      case 'ArrowDown':
        this.changeFocus(0, 1);
        break;
      case 'ArrowLeft':
        this.changeFocus(-1, 0);
        break;
      case 'ArrowRight':
        this.changeFocus(1, 0);
        break;
      case 'Backspace':
        this.erase();
        break;
      case 'Escape':
        this.activeCell = undefined;
        break;
      default:
        return;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const value = parseInt(event.key, 10);

    if (!this.activeCell || isNaN(value) || value < 1 || value > 9) {
      return;
    }
    this.write(value);
  }

  erase(): void {
    this.notesOn = false;
    if (this.activeCell && !this.activeCell.readonly) {
      this.activeCell.notes = [];
      this.activeCell.value = undefined;
      this.checkControls();
    }
  }

  toggleNotes(): void {
    this.notesOn = !this.notesOn;
    this.showAnswer = false;
  }

  hint(): void {
    this.notesOn = false;
    if (this.activeCell && !this.activeCell.readonly) {
      this.activeCell.value = this.activeCell.answer;
      this.activeCell.readonly = true;
      this.cleanNotes();
      this.checkControls();
      this.checkFinished();
    }
  }

  validate(): void {
    this.showAnswer = !this.showAnswer;
    this.notesOn = false;
  }

  write(value: number) {
    this.showAnswer = false;
    const field = this.activeCell;

    if (this.notesOn && !field.value) {
      if (!field.notes) {
        this.activeCell.notes = [];
      }
      if (!field.notes.find(i => i === value)) {
        field.notes = field.notes.concat(value);
      } else {
        field.notes = field.notes.filter(i => i !== value);
      }
    } else if (!this.notesOn && !field.readonly) {
      field.value = value;
      this.checkControls()
      this.cleanNotes();
      this.checkFinished();
    }
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

  private changeFocus(relativeCol = 0, relativeRow = 0): void {
    if (!this.activeCell) {
      return;
    }
    const between = (newValue: number, min: number, max: number) => {
      return Math.min(Math.max(newValue, min), max);
    };

    const newRow = between(this.currentRow + relativeRow, 0, 8);
    const newCol = between(this.currentCol + relativeCol, 0, 8);

    this.activeCell = this.sudoku[newRow][newCol];
  }

  private cleanNotes(): void {
    const removeNote = (field: SudokuCell) => {
      field.notes = field.notes ? field.notes.filter(n => n !== this.activeCell.value) : [];
    };

    this.sudoku[this.currentRow].forEach(field => removeNote(field));
    this.sudoku.forEach(row => removeNote(row[this.currentCol]));

    const firstCol = this.currentCol - this.currentCol % 3;
    const firstRow = this.currentRow - this.currentRow % 3;

    [0, 1, 2].forEach(rowOffset => {
      [0, 1, 2].forEach(colOffset => {
        removeNote(this.sudoku[firstRow + rowOffset][firstCol + colOffset]);
      });
    });
  }

  private checkControls(): void {
    const countNumber = i => this.sudoku.reduce((sum, row) => sum + row.filter(f => f.value === i).length, 0);

    this.controlButtons.forEach(button => {
      button.disabled = countNumber(button.value) >= 9;
    });
  }

  private checkFinished(): void {
    if (this.finished) {
      this.validate();
      this.activeCell = undefined;
      this.stopTimer.emit(true);
    }
  }

  private get finished(): boolean {
    return this.sudoku.every(row => row.every(field => field.value === field.answer));
  }

  resetButtons(): void {
    this.showAnswer = false;
    this.notesOn = false;
  }
}

