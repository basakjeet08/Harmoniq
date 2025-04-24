import { Observable } from 'rxjs';
import { PageWrapper } from '../Models/common/PageWrapper';
import { TagDto } from '../Models/tag/TagDto';

export interface TagInterface {
  fetchAllTags(pageable: { page: number; size: number }): Observable<PageWrapper<TagDto>>;
}
