import firestore from '@react-native-firebase/firestore';

import { limits } from 'config';
import { Collections } from 'services/firestore';
import { ChatRoom } from './types';

export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const querySnapshot = await firestore()
    .collection(Collections.ChatRooms)
    .orderBy('updatedAt', 'desc')
    .limit(limits.getChatRooms)
    .get();

  const chatRooms = querySnapshot
    .docs
    .map(doc => ({
      ...doc.data() as ChatRoom,
      id: doc.id
    }));

  return chatRooms;
}