import { Component } from '@angular/core';
import { ToastMessage, ToastService } from './toast.service';
import { toastAnimation } from '../animations/toast-animation';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [toastAnimation],
})
export class ToastComponent {
  // This is the toast data for the component
  toasts: ToastMessage[] = [];

  // Injecting the necessary dependencies
  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe((toasts) => (this.toasts = toasts));
  }
}
