
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SudokuCell, Difficulty } from './../models/sudoku.model';
const { SudokuSolver } = require('@jlguenego/sudoku-generator');
import { delay } from 'rxjs/operators';


@Injectable()
export class SudokuService {
  sudoku: SudokuCell;
  elapsedTime: number;
  difficulty: Difficulty = 'easy';
  solution: any;

  constructor(private http: HttpClient) { }

  fetchData(): Observable<{}> {
    return this.http.get('api/data').pipe(
      delay(1000));
  }

  generateNewGame(difficulty: Difficulty) {
    this.solution = SudokuSolver.generate();
    return this.maskGrid(this.solution, difficulty);
  }

  maskGrid(solution, difficulty: Difficulty) {
    this.sudoku = undefined;

    this.difficulty = difficulty;
    const masked = SudokuSolver.carve(solution, this.emptyFieldsCount);
    this.sudoku = solution.map(row => row.map(value => ({ answer: value })));

    masked.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        this.sudoku[rowIndex][colIndex].value = value === 0 ? undefined : value;
        this.sudoku[rowIndex][colIndex].readonly = value !== 0;
        this.sudoku[rowIndex][colIndex].clearOnReset = !this.sudoku[rowIndex][colIndex].readonly;
      });
    });
    return this.sudoku;
  }

  private get emptyFieldsCount(): number {
    switch (this.difficulty) {
      case 'easy':
        return 40;
      case 'medium':
        return 47;
      case 'hard':
        return 51;
      case 'expert':
        return 56;
    }
  }
}
