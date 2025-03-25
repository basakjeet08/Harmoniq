import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// This is the data type for the toasts
export interface ToastMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  // Toast related data
  private toastQueue = new BehaviorSubject<ToastMessage[]>([]);
  toast$ = this.toastQueue.asObservable();

  // This function is used to receive new toast requests
  showToast(toast: ToastMessage) {
    const currentToasts = this.toastQueue.value;
    this.toastQueue.next([...currentToasts, toast]);

    // Auto Remove after the duration
    setTimeout(() => {
      this.removeToast(toast);
    }, toast.duration || 3000);
  }

  // This function removes the shown toast
  removeToast(toast: ToastMessage) {
    this.toastQueue.next(this.toastQueue.value.filter((t) => t !== toast));
  }
}
