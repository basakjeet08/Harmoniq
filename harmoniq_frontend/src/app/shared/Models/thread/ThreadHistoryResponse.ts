import { UserDto } from '../user/UserDto';

export interface ThreadHistoryItem {
  id: string;
  description: string;
  tags: string[];
  totalLikes: number;
  likedByUserIds: string[];
  isLikedByCurrentUser: boolean;
  totalComments: number;
}

export interface ThreadHistoryResponse {
  createdBy: UserDto;
  threadList: ThreadHistoryItem[];
}
