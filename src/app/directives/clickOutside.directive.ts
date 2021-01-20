import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class OutsideDirective {

  @Output() clickedOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  onClick(event) {
    if (event.target.parentNode.className !== 'app-dropdown'
      && event.target.parentNode.className !== 'app-settings'
      && !event.target.classList.contains('app-settings')) {
      this.clickedOutside.emit();
    }
  }
}
