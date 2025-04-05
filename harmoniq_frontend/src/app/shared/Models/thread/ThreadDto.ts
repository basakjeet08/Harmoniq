import { UserDto } from '../user/UserDto';

export interface ThreadDto {
  id: string;
  description: string;
  tags: string[];
  createdBy: UserDto;
  totalLikes: number;
  likedByUserIds: string[];
  isLikedByCurrentUser: boolean;
  totalComments: number;
}
