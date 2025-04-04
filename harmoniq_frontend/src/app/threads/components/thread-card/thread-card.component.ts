import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/shared/Models/user/Roles';
import { UserDto } from 'src/app/shared/Models/user/UserDto';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css'],
})
export class ThreadCardComponent {
  // These are the various inputs and outputs to the component
  @Input('createdBy') createdBy!: UserDto;

  @Input('threadId') threadId: string = '';
  @Input('description') description: string = '';
  @Input('tagList') tagList: string[] = [];
  @Input('isLiked') isLiked: boolean = false;

  @Input('showDelete') showDelete: boolean = false;
  @Input('showMore') showMore: boolean = true;

  @Output('onShowMoreClick') showMoreEmitter = new EventEmitter<void>();
  @Output('onDeleteClick') deleteEmitter = new EventEmitter<void>();

  // Injecting the necessary dependencies
  constructor(private router: Router) {}

  // This function gives if the user is a moderator or not
  get isModerator() {
    return this.createdBy.role === Roles.MODERATOR;
  }

  // This function is invoked when the thread card is clicked
  onShowMoreClick() {
    this.showMoreEmitter.emit();
  }

  // This function is invoked when the delete button is clicked
  onDeleteClick() {
    this.deleteEmitter.emit();
  }

  // This function is invoked when the like button is clicked
  onLikeButtonClick() {
    console.log(this.threadId + 'Liked !!');
  }

  // This function is invoked when the user clicks on the user avatar
  onAvatarClick() {
    this.router.navigate(['/dashboard/profile', this.createdBy.id]);
  }
}
