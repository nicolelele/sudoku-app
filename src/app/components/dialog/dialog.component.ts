import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent {

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  uploadedFiles: File[];
  tooltipText = 'add your own 2D array from\na json file';

  fileChange(pFileList: File[]) {
    this.uploadedFiles = Object.keys(pFileList).map(key => pFileList[key]);
  }

  deleteFile(file: File) {
    setTimeout(() => this.uploadedFiles = this.uploadedFiles.filter((x) => { return x.name !== file.name }), 100);
  }

  upload(): void {
    const formData = new FormData();
    formData.append('uploads[]', this.uploadedFiles[0], this.uploadedFiles[0].name);

    this.http.post('/api/upload', formData, { responseType: 'text' })
      .subscribe((response) => console.log(response))
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}