import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};