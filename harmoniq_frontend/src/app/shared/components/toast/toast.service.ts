import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// This is the data type for the toasts
export interface ToastMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  // Toast related data
  private toastQueue: BehaviorSubject<ToastMessage[]> = new BehaviorSubject<ToastMessage[]>([]);
  toast$: Observable<ToastMessage[]> = this.toastQueue.asObservable();

  // This function is used to receive new toast requests
  showToast(toast: ToastMessage): void {
    const currentToasts: ToastMessage[] = this.toastQueue.value;
    this.toastQueue.next([...currentToasts, toast]);

    // Auto Remove after the duration
    setTimeout((): void => {
      this.removeToast(toast);
    }, toast.duration || 3000);
  }

  // This function removes the shown toast
  removeToast(toast: ToastMessage): void {
    this.toastQueue.next(this.toastQueue.value.filter((t: ToastMessage) => t !== toast));
  }
}
