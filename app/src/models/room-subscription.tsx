import firestore from '@react-native-firebase/firestore';
import { getCurrentUser } from 'services/auth';
import { Collections } from 'services/firestore';
import { getPushNotificationToken } from 'services/messaging';
import { INewRoomSubscription } from "./types"

export const addRoomSubscription = async (
  roomSubscription: INewRoomSubscription
) => {
  let newRoomSubscription = roomSubscription;

  if (!newRoomSubscription.userId) {
    const user = await getCurrentUser();

    newRoomSubscription = {
      ...newRoomSubscription,
      userId: user.userId
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

export const checkUserRoomSubscriptionExists = async (roomId: string): Promise<boolean> => {
  const user = await getCurrentUser();

  const querySnapshot = await firestore()
    .collection(Collections.RoomSubscriptions)
    .where('roomId', '==', roomId)
    .where('userId', '==', user.userId)
    .get();
  
  return !querySnapshot.empty;
}