import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPageDirective]'
})
export class AppPageDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

