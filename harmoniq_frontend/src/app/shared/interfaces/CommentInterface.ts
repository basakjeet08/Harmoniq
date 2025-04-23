import { Observable } from 'rxjs';
import { CommentDto } from '../Models/comment/CommentDto';

export interface CommentInterface {
  create(commentRequest: { comment: string; threadId: string }): Observable<CommentDto>;
}
