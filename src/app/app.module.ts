import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingIconComponent } from './components/loader/loading-icon';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { GridComponent } from './components/sudoku/grid/grid.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SudokuService } from './services/sudoku.service';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { OutsideDirective } from './directives/clickOutside.directive';
import { FileDragNDropDirective } from './directives/fileDragDrop.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadingIconComponent,
    SudokuComponent,
    GridComponent,
    DialogComponent,
    FormatTimePipe,
    OutsideDirective,
    FileDragNDropDirective
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [SudokuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
