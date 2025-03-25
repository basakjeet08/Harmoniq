import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css'],
})
export class CommentCardComponent {
  // Input Fields which will be passed by the parent component
  @Input('creatorName') creatorName: string = '';
  @Input('creatorRole') creatorRole: string = '';
  @Input('creatorAvatar') creatorAvatar: string = '';
  @Input('comment') comment: string = '';
}
