import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Message {
  id: string;
  uid: string;
  roomId: string,
  author: string;
  avatarImageUrl: string;
  content: string;
  imageUrl: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  type: 'text' | 'image';
};