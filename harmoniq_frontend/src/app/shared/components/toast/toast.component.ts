import { Component } from '@angular/core';
import { ToastMessage, ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  // This is the toast data for the component
  toasts: ToastMessage[] = [];

  // Injecting the necessary dependencies
  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe((toasts) => (this.toasts = toasts));
  }
}
