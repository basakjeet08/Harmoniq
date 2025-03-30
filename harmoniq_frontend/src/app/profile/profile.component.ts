import { Component } from '@angular/core';
import { scaleUpAnimation } from '../shared/animations/scale-up-animation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [scaleUpAnimation],
})
export class ProfileComponent {
  // This is the data for the component
  isEditMode: boolean = false;

  // This function is invoked when the user clicks on the edit button
  onEditToggle() {
    this.isEditMode = !this.isEditMode;
  }
}
