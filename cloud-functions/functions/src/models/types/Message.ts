import { firestore } from 'firebase-admin';

export interface Message {
  id: string;
  userId: string;
  roomId: string,
  author: string;
  avatarImageUrl: string;
  content: string;
  imageUrl: string;
  createdAt: firestore.Timestamp;
  type: 'text' | 'image';
}