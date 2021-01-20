import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { SudokuCell, Difficulty } from './models/sudoku.model';
import { SudokuService } from './services/sudoku.service';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Input() difficulty: Difficulty = 'easy';
  @ViewChild(SudokuComponent) sudokuComponent: SudokuComponent;
  private timerSubscription: Subscription;
  stopTimer$ = new Subject();
  startTimer$ = new Subject();
  sudoku: SudokuCell;
  elapsedTime: number;
  solved = false;

  constructor(private sudokuService: SudokuService) { }

  ngOnInit(): void {
    this.generate(this.difficulty);
  }

  generate(difficulty: Difficulty): void {
    this.sudoku = undefined;
    this.sudokuService.generateNewGame(difficulty);
    setTimeout(() => this.sudoku = this.sudokuService.generateNewGame(difficulty), 1000);
    this.startTimer();
  }

  changeSetting(newSetting: Difficulty): void {
    this.difficulty = newSetting;
    this.generate(this.difficulty);
  }

  newGame(): void {
    this.generate(this.difficulty);
  }

  solve(): void {
    this.solved = true;
    this.stopTimer();
  }

  stopTimer(): void {
    this.stopTimer$.next();
    this.timerSubscription.unsubscribe();
  }

  startTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerSubscription = timer(0, 1000).pipe(
      takeUntil(this.stopTimer$)
    ).subscribe(time => this.elapsedTime = time);
  };

  reset(): void {
    if (this.sudoku) {
      for (let i = 0; i < 9; i++) {
        const row = this.sudoku[i];
        for (const field of row) {
          if (field.clearOnReset) {
            field.value = undefined;
            field.notes = undefined;
          }
        }
      }
      this.startTimer();
      this.sudokuComponent.resetButtons();
    }
  }

  generateCustom() {
    this.sudoku = undefined;
    this.sudokuService.fetchData().toPromise()
      .then(res => {
        const solution = res;
        this.sudoku = this.sudokuService.maskGrid(solution, this.difficulty);
      });
    this.startTimer();
  }
}
