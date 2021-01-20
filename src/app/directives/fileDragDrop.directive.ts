import {
  Directive,
  HostListener,
  HostBinding,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Directive({
  selector: '[appFileDragDrop]'
})
export class FileDragNDropDirective {
  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#EFEFEF';
  @HostBinding('style.border') private borderStyle = '2px dashed #757B8F';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#E5E5E5';
    this.borderStyle = '2px dashed #494E61';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#EFEFEF';
    this.borderStyle = '2px dashed #757B8F';
  }

  @HostListener('drop', ['$event']) public onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.background = '#EFEFEF';
    this.borderStyle = '2px dashed #757B8F';
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      this.borderStyle = '2px dashed #EA5885';
      setTimeout(() => this.borderStyle = '2px dashed #757B8F', 150);
      return;
    } else {
      const validFiles: Array<File> = files;
      this.filesChangeEmiter.emit(validFiles);
    }
  }
}
