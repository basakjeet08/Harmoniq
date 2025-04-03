import { Observable } from 'rxjs';
import { ThreadDto } from '../Models/thread/ThreadDto';
import { ThreadDetailResponse } from '../Models/thread/ThreadDetailResponse';
import { ThreadHistoryResponse } from '../Models/thread/ThreadHistoryResponse';

export interface ThreadInterface {
  create(thread: { description: string }): Observable<ThreadDto>;

  findById(id: string): Observable<ThreadDetailResponse>;

  findAll(): Observable<ThreadDto[]>;

  findByTags(tag: string): Observable<ThreadDto[]>;

  fetchThreadHistory(): Observable<ThreadHistoryResponse>;

  deleteById(id: string): Observable<void>;
}
