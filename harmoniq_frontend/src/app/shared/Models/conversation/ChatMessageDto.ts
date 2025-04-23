export enum MessageType {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}

export interface ChatMessageDto {
  id: string;
  text: string;
  messageType: MessageType;
  createdAt: Date;
}
