import { Observable } from 'rxjs';
import { ThreadDto } from '../Models/thread/ThreadDto';
import { ThreadDetailResponse } from '../Models/thread/ThreadDetailResponse';
import { ThreadHistoryResponse } from '../Models/thread/ThreadHistoryResponse';
import { PageWrapper } from '../Models/common/PageWrapper';

export interface ThreadInterface {
  create(thread: { description: string }): Observable<ThreadDto>;

  findById(id: string): Observable<ThreadDetailResponse>;

  findThreadsByTag(
    tag: string,
    pageable: { page: number; size: number }
  ): Observable<PageWrapper<ThreadDto>>;

  findPersonalisedThreads(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ThreadDto>>;

  findPopularThreads(pageable: {
    page: number;
    size: number;
  }): Observable<PageWrapper<ThreadDto>>;

  fetchThreadHistory(): Observable<ThreadHistoryResponse>;

  toggleThreadLike(threadId: string): Observable<void>;

  deleteById(id: string): Observable<void>;
}
