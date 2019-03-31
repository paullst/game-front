import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '@models/notification.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Notification Service
 */
export class NotificationService {

  private notifSubject = new Subject<Notification>();
  notif = this.notifSubject.asObservable();

  constructor() {
    this.clearError();
  }

  setError(code: number, message: string, type: string) {
    console.log('err');
    this.notifSubject.next(new Notification(code, message, type));
  }

  clearError() {
    this.notifSubject.next(null);
  }
}
