import firestore from '@react-native-firebase/firestore';
import { Collections } from 'services/firestore';
import { IChatRoom } from './types';

export const getChatRooms = async (): Promise<IChatRoom[]> => {
  const LIMIT = 50;

  const querySnapshot = await firestore()
    .collection(Collections.ChatRooms)
    .orderBy('updatedAt', 'desc')
    .limit(LIMIT)
    .get();

  const chatRooms = querySnapshot
    .docs
    .map(doc => ({
      ...doc.data() as IChatRoom,
      id: doc.id
    }));

  return chatRooms;
}