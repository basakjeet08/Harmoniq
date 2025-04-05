import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/shared/Models/user/Roles';
import { UserDto } from 'src/app/shared/Models/user/UserDto';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent {
  // Input Fields which will be passed by the parent component
  @Input('createdBy') createdBy!: UserDto;
  @Input('comment') comment: string = '';

  // Injecting the necessary dependencies
  constructor(private router: Router) {}

  // This function returns if the user is a moderator or not
  get isModerator() {
    return this.createdBy.role === Roles.MODERATOR;
  }

  // This function is invoked when the user clicks on the user avatar
  onAvatarClick() {
    this.router.navigate(['/dashboard/profile', this.createdBy.id]);
  }
}
