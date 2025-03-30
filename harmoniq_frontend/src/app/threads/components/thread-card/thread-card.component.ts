import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css'],
})
export class ThreadCardComponent {
  // These are the various inputs and outputs to the component
  @Input('creatorId') creatorId: string = '';
  @Input('creatorName') creatorName: string = '';
  @Input('creatorRole') creatorRole: string = '';
  @Input('creatorAvatar') creatorAvatar: string = '';
  @Input('description') description: string = '';
  @Input('tagList') tagList: string[] = [];
  @Input('isHoverEffect') isHoverEffect: boolean = true;
  @Input('showDelete') showDelete: boolean = false;

  @Output('onThreadClick') threadEmitter = new EventEmitter<void>();
  @Output('onDeleteClick') deleteEmitter = new EventEmitter<void>();

  // Injecting the necessary dependencies
  constructor(private router: Router) {}

  // This function is invoked when the thread card is clicked
  onThreadClick() {
    this.threadEmitter.emit();
  }

  // This function is invoked when the delete button is clicked
  onDeleteClick() {
    this.deleteEmitter.emit();
  }

  // This function is invoked when the user clicks on the user avatar
  onAvatarClick() {
    this.router.navigate(['/dashboard/profile', this.creatorId]);
  }
}
