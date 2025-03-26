export enum MessageType {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export class ChatMessageDto {
  constructor(
    readonly id: string,
    readonly text: string,
    readonly messageType: MessageType,
    readonly createdAt: Date
  ) {}
}
