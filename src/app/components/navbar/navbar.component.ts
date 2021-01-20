import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Difficulty } from 'src/app/models/sudoku.model';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  @Output() restart = new EventEmitter();
  @Output() resetGrid = new EventEmitter();
  @Output() difficultyChanged: EventEmitter<string> = new EventEmitter();
  @Output() generateCustomGrid = new EventEmitter();
  open = false;

  constructor(public dialog: MatDialog) { }

  restartGame(): void {
    this.restart.emit();
  }

  resetGame(): void {
    this.resetGrid.emit();
  }

  toggleDropdown(): void {
    this.open = !this.open;
  }

  closeDropdown(): void {
    setTimeout(() => {
      this.open = false;
    })
  }

  changeDifficulty(difficulty: Difficulty): void {
    this.closeDropdown();
    this.difficultyChanged.emit(difficulty);
  }

  openDialog(event): void {
    const initiator: any = event.currentTarget;

    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.generateCustomGrid.emit();
      setTimeout(() => {
        try { initiator.blur(); } catch { }
      }, 0);
    });
  }
}
