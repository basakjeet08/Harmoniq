import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  // Inputs Provided by the parent component
  @Input('disabled') disabled: boolean = false;
  @Input('placeholder') placeholder: string = 'Enter the Input';
  @Input('buttonText') buttonText: string = 'Submit';
  @Input('type') type: string = 'text';

  // This is the event which will be emitted when the button is clicked
  @Output('onButtonClick') buttonEvent = new EventEmitter<string>();

  // This is the user input variable
  userInput: string = '';

  // Global Loading State to prevent multiple API Calls
  loadingState: boolean = false;

  // Injecting the necessary dependencies
  constructor(private loaderService: LoaderService) {
    this.loaderService.loaderState$.subscribe((state) => (this.loadingState = state));
  }

  // This function is invoked when the user clicks the input button
  onButtonClick(): void {
    this.buttonEvent.emit(this.userInput);
  }

  // This function is invoked when the user wants to reset the Component
  resetComponent(): void {
    this.userInput = '';
  }
}
