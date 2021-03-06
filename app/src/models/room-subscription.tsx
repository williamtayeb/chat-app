import firestore from '@react-native-firebase/firestore';
import { getCurrentUser } from 'services/auth';
import { Collections } from 'services/firestore';
import { getPushNotificationToken } from 'services/messaging';
import { NewRoomSubscription } from "./types"

export const addRoomSubscription = async (
  roomSubscription: NewRoomSubscription
) => {
  let newRoomSubscription = roomSubscription;

  if (!newRoomSubscription.userId) {
    const user = await getCurrentUser();

    newRoomSubscription = {
      ...newRoomSubscription,
      userId: user.id
    };
  }

  if (!newRoomSubscription.pushNotificationToken) {
    const pushNotificationToken = await getPushNotificationToken();

    newRoomSubscription = {
      ...newRoomSubscription,
      pushNotificationToken
    };
  }

  await firestore()
    .collection(Collections.RoomSubscriptions)
    .add(newRoomSubscription);
};

/**
 * Checks if a room subscription record already exists for
 * the current user and the specified chat room.
 * @param roomId Identifier of the chat room
 * @returns A boolean value that is true if a room subscription
 * record exists.
 */
export const checkUserRoomSubscriptionExists = async (roomId: string): Promise<boolean> => {
  const user = await getCurrentUser();

  const querySnapshot = await firestore()
    .collection(Collections.RoomSubscriptions)
    .where('roomId', '==', roomId)
    .where('userId', '==', user.id)
    .get();
  
  return !querySnapshot.empty;
}