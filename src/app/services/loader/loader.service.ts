import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();
  
  constructor() {
    this.hide();
  }
  
  show() {
    this.loaderSubject.next(true);
  }

  hide() {
    this.loaderSubject.next(false);
  }
}
