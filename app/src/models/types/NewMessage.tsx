export interface NewMessage {
  id?: string;
  userId?: string;
  roomId: string;
  author?: string;
  avatarImageUrl?: string;
  content?: string;
  imageUrl?: string;
  createdAt?: Date;
  type: 'text' | 'image';
}