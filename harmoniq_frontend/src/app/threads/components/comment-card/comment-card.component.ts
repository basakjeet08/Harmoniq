import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent {
  // Input Fields which will be passed by the parent component
  @Input('creatorId') creatorId: string = '';
  @Input('creatorName') creatorName: string = '';
  @Input('creatorRole') creatorRole: string = '';
  @Input('creatorAvatar') creatorAvatar: string = '';
  @Input('comment') comment: string = '';

  // Injecting the necessary dependencies
  constructor(private router: Router) {}

  // This function is invoked when the user clicks on the user avatar
  onAvatarClick() {
    this.router.navigate(['/dashboard/profile', this.creatorId]);
  }
}
