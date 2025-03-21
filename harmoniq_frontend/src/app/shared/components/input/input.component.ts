import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  // Inputs Provided by the parent component
  @Input('placeholder') placeholder: string = 'Enter the Input';
  @Input('buttonText') buttonText: string = 'Submit';
  @Input('type') type: string = 'text';

  // This is the event which will be emitted when the button is clicked
  @Output('onButtonClick') buttonEvent = new EventEmitter<string>();

  // This is the user input variable
  userInput: string = '';

  // This function is invoked when the user clicks the input button
  onButtonClick() {
    this.buttonEvent.emit(this.userInput);
  }
}
