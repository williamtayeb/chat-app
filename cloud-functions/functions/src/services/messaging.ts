import { messaging } from 'firebase-admin';
import { linkingConfig } from '../config';
import { Message } from '../models/types';
/**
 * Returns a deep link string to the specified room id
 * based on the configured prefix and room path.
 * @param roomId The room id that the link should point to
 * @returns For example `chatapp://room/{roomId}`
 */
const getRoomDeepLink = (roomId: string): string => {
  const { prefix, roomPath } = linkingConfig;
  return `${prefix}${roomPath}/${roomId}`
}

export const sendMessagePushNotifications = async (tokens: string[], message: Message) => {
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