import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.css'],
})
export class ErrorCardComponent {
  // Input for the error state and the event listener for the cancel click
  @Input('errorMessage') errorMessage: string | null = null;
  @Output('onCancelClick') onCancelClickEvent = new EventEmitter<void>();

  // This function is invoked when the cancel button is clicked
  onCancelClick() {
    this.onCancelClickEvent.emit();
  }
}
