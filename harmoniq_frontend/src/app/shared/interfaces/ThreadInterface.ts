import { Observable } from 'rxjs';
import { ThreadDto } from '../Models/thread/ThreadDto';
import { PageWrapper } from '../Models/common/PageWrapper';

export interface ThreadInterface {
  create(thread: { description: string }): Observable<ThreadDto>;

  findById(id: string): Observable<ThreadDto>;

  findThreadsByTag(
    tag: string,
    pageable: { page: number; size: number },
  ): Observable<PageWrapper<ThreadDto>>;

  findPersonalisedThreads(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ThreadDto>>;

  findPopularThreads(pageable: { page: number; size: number }): Observable<PageWrapper<ThreadDto>>;

  fetchThreadHistory(pageable: { page: number; size: number }): Observable<PageWrapper<ThreadDto>>;

  toggleThreadLike(threadId: string): Observable<void>;

  deleteById(id: string): Observable<void>;
}
