import { CommentDto } from '../comment/CommentDto';
import { UserDto } from '../user/UserDto';

export interface ThreadDetailResponse {
  id: string;
  description: string;
  tags: string[];
  createdBy: UserDto;
  comments: CommentDto[];
  totalLikes: number;
  likedByUserIds: string[];
  isLikedByCurrentUser: boolean;
  totalComments: number;
}
