import * as functions from "firebase-functions";
import { firestore, initializeApp, messaging } from 'firebase-admin';

initializeApp();

export interface Message {
  id: string;
  userId: string;
  roomId: string,
  author: string;
  avatarImageUrl: string;
  content: string;
  imageUrl: string;
  createdAt: firestore.Timestamp;
  type: 'text' | 'image';
}

export interface RoomSubscription {
  userId: string;
  roomId: string;
  pushNotificationToken: string;
  enabled: boolean;
}

export enum Collections {
  ChatRooms = 'chatRooms',
  Messages = 'messages',
  RoomSubscriptions = 'roomSubscriptions'
}

const config = {
  linkPrefix: 'chatapp://',
  roomPath: 'room/'
};

const updateChatRoomTimestamp = async (roomId: string) => {
  await firestore()
    .collection(Collections.ChatRooms)
    .doc(roomId)
    .update({ updatedAt: new Date() });
};

const sendPushNotifications = async (message: Message) => {
  const tokens = await getTokens(message.roomId);

  const payload: messaging.MessagingPayload = {
    notification: {
      title: message.author,
      body: message.content
    },
    data: {
      link: getRoomDeepLink(message.roomId)
    }
  };

  await messaging().sendToDevice(tokens, payload);
}

const getTokens = async (roomId: string, limit: number = 500): Promise<string[]> => {
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

const getRoomDeepLink = (roomId: string) => {
  return `${config.linkPrefix}${config.roomPath}${roomId}`
}

export const handleNewMessage = functions
  .firestore
  .document(`${Collections.Messages}/{messageId}`)
  .onCreate(async (snap, context) => {
    const newMessage = snap.data() as Message;

    await updateChatRoomTimestamp(newMessage.roomId);
    await sendPushNotifications(newMessage);
  });