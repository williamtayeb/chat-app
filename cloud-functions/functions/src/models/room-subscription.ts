import { firestore } from 'firebase-admin';
import { Collections } from '../services/firestore';
import { RoomSubscription } from './types';

export const getPushNotificationTokens = async (roomId: string, limit: number = 500): Promise<string[]> => {
  const querySnapshot = await firestore()
    .collection(Collections.RoomSubscriptions)
    .where('roomId', '==', roomId)
    .limit(limit)
    .get();
  
  const tokens: string[] = querySnapshot.docs.map(doc => {
    const subscription = doc.data() as RoomSubscription;
    return subscription.pushNotificationToken;
  });

  return tokens;
}