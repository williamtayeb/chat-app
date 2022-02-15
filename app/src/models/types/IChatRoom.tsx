import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IChatRoom {
  id: string;
  name: string;
  description: string;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
};