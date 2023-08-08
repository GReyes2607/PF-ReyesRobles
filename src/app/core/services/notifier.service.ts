import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

interface myNotification {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private notifier$ = new Subject<myNotification>();

  constructor() {
    this.notifier$.subscribe({
      next: (myCustomNotificacion) => {
        Swal.fire(myCustomNotificacion.title, myCustomNotificacion.message, myCustomNotificacion.type)
      }
    });
  }

  showSuccess(message: string, title = 'Realizado'): void {
    this.notifier$.next({
      type: 'success',
      message,
      title
    });
  }

  getError(message: string, title = 'Error'): void {
    this.notifier$.next({
      type: 'error',
      message,
      title
    });
  }
}
