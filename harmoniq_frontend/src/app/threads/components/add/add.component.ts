import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  // These are the details inputted by the user
  userInput = { description: '' };

  // These are the loading and error states
  isLoading: boolean = false;
  errorMessage: string | null = null;
  isEditMode: boolean = false;

  // Injecting the necessary dependencies
  constructor(private location: Location) {}

  // This function is invoked when the user clicks on the post thread button
  onPostClick() {
    console.log(this.userInput);
  }

  // This function is invoked when the user clicks on cancel button
  onCancelClick() {
    this.location.back();
  }

  // This function is invoked when the user clicks on the cancel error button
  onErrorCancelClick() {
    this.errorMessage = null;
  }
}
