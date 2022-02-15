import { messaging } from 'firebase-admin';
import { config } from '../config';
import { Message } from '../models/types';

const getRoomDeepLink = (roomId: string): string => {
  const { prefix, roomPath } = config.linking;
  return `${prefix}${roomPath}/${roomId}`
}

export const sendPushNotifications = async (tokens: string[], message: Message) => {
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