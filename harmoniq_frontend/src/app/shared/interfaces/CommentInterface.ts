import { Observable } from 'rxjs';
import { CommentDto } from '../Models/comment/CommentDto';
import { PageWrapper } from '../Models/common/PageWrapper';

export interface CommentInterface {
  create(commentRequest: { comment: string; threadId: string }): Observable<CommentDto>;

  findCommentsForThread(
    threadId: string,
    pageable: { page: number; size: number },
  ): Observable<PageWrapper<CommentDto>>;
}
