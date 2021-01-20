export type Sudoku = SudokuCell[][];

export interface SudokuCell {
  value?: number;
  notes?: number[];
  answer: number;
  readonly?: boolean;
  clearOnReset?: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface DigitButton {
  value: number;
  disabled?: boolean;
}