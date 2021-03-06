import * as functions from "firebase-functions";
import { initializeApp } from 'firebase-admin';

import { Message } from "./models/types";
import { Collections } from "./services/firestore";
import { getPushNotificationTokens } from "./models/room-subscription";
import { updateChatRoomTimestamp } from "./models/chat-room";
import { sendMessagePushNotifications } from "./services/messaging";

// Initialize the firebase admin SDK which is required
// in order to access firestore
initializeApp();

/**
 * A cloud firestore function that triggers whenever a new
 * message has been created. This function is responsible for
 * updating the chat room timestamp that is associated with
 * the message and send a push notification to all subscribers.
 */
export const handleNewMessage = functions
  .firestore
  .document(`${Collections.Messages}/{messageId}`)
  .onCreate(async (snap, context) => {
    // Get the newly created message
    const newMessage = snap.data() as Message;

    await updateChatRoomTimestamp(newMessage.roomId);

    const tokens = await getPushNotificationTokens(newMessage.roomId);
    await sendMessagePushNotifications(tokens, newMessage);
  });