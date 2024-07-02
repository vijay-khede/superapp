import { Component } from '@angular/core';

@Component({
  selector: 'superapp-root',
  template: `<router-outlet content></router-outlet>`,
})
export class MicroAppComponent {
  constructor() {}
}
