export enum MessageType {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export interface ChatMessageDto {
  id: string;
  text: string;
  messageType: MessageType;
  createdAt: Date;
}
