import { Observable } from 'rxjs';
import { TagDto } from '../Models/tag/TagDto';

export interface TagInterface {
  fetchAllTags(): Observable<TagDto[]>;
}
