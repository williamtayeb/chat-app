import { firestore } from 'firebase-admin';
import { Collections } from '../services/firestore';

/**
 * Updates the value of the `updatedAt` field of the specified
 * chat room to the current date and time.
 * @param roomId Identifier of the chat room
 */
export const updateChatRoomTimestamp = async (roomId: string) => {
  await firestore()
    .collection(Collections.ChatRooms)
    .doc(roomId)
    .update({ updatedAt: new Date() });
};