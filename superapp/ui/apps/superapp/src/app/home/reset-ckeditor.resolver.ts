import { Injectable } from '@angular/core';
import {  Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetCKEditorResolver implements Resolve<any> {
  constructor() {}

  resolve(): Observable<any> {
      return new Observable((obs) => {
          (window as any).CKEDITOR_VERSION = null;
          obs.next(true);
          obs.complete();
      });
  }
}
