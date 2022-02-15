import { firestore } from 'firebase-admin';
import { Collections } from '../services/firestore';

export const updateChatRoomTimestamp = async (roomId: string) => {
  await firestore()
    .collection(Collections.ChatRooms)
    .doc(roomId)
    .update({ updatedAt: new Date() });
};