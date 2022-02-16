import { firestore } from 'firebase-admin';
import { Collections } from '../services/firestore';
import { RoomSubscription } from './types';

/**
 * Retrieves a list of push notification tokens that is 
 * associated with the specified room.
 * @param roomId Identifier of the chat room.
 * @param limit The maximum number of tokens to retrieve.
 * The default value is set to 500.
 * @returns An array of strings that each represents a token.
 */
export const getPushNotificationTokens = async (roomId: string, limit: number = 500): Promise<string[]> => {
  const querySnapshot = await firestore()
    .collection(Collections.RoomSubscriptions)
    .where('roomId', '==', roomId)
    .where('enabled', '==', true)
    .limit(limit)
    .get();
  
  const tokens: string[] = querySnapshot.docs.map(doc => {
    const subscription = doc.data() as RoomSubscription;
    return subscription.pushNotificationToken;
  });

  return tokens;
}