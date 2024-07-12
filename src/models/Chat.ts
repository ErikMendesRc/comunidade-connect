export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: Date;
  participants: string[];
}