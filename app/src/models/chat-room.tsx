import firestore from '@react-native-firebase/firestore';

import { limits } from 'config';
import { Collections } from 'services/firestore';
import { IChatRoom } from './types';

export const getChatRooms = async (): Promise<IChatRoom[]> => {
  const querySnapshot = await firestore()
    .collection(Collections.ChatRooms)
    .orderBy('updatedAt', 'desc')
    .limit(limits.getChatRooms)
    .get();

  const chatRooms = querySnapshot
    .docs
    .map(doc => ({
      ...doc.data() as IChatRoom,
      id: doc.id
    }));

  return chatRooms;
}