import firestore, { FirebaseFirestoreTypes as FirestoreTypes } from '@react-native-firebase/firestore';
import { limits } from 'config';
import { getCurrentUser } from 'services/auth';
import { Collections } from 'services/firestore';
import { IMessage, INewMessage } from './types';

interface IResult {
  data: IMessage[],
  lastVisible: FirestoreTypes.QueryDocumentSnapshot<FirestoreTypes.DocumentData>
}

export const getMessagesByRoomId = async (roomId: string, startAfter?: FirestoreTypes.QueryDocumentSnapshot<FirestoreTypes.DocumentData>): Promise<IResult> => {
  let query = firestore()
    .collection(Collections.Messages)
    .where('roomId', '==', roomId)
    .orderBy('createdAt', 'desc');

  if (startAfter) {
    query = query.startAfter(startAfter)
  }

  const querySnapshot = await query
    .limit(limits.getMessagesByRoomId)
    .get();

  const data = querySnapshot
    .docs
    .map(doc => ({
      ...doc.data() as IMessage,
      id: doc.id
    }));

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  return {
    data,
    lastVisible
  };
};

export const addMessage = async (message: INewMessage): Promise<IMessage> => {
  let newMessage = message;

  if (!newMessage.uid) {
    const user = getCurrentUser();

    if (!user.name) {
      throw new Error("The user does not have a valid name");
    }

    newMessage = {
      ...newMessage,
      uid: user.userId,
      author: user.name
    }

    if (user.avatarImageUrl) {
      newMessage = {
        ...newMessage,
        avatarImageUrl: user.avatarImageUrl,
      }
    }
  }
  
  // Set the 'createdAt' field to current date and time if
  // it has not been specified
  if (!newMessage.createdAt) {
    newMessage = {
      ...newMessage,
      createdAt: new Date()
    }
  }

  if (message.type === 'text' && !message.content) {
    throw new Error("Messages of type text must contain valid content value");
  }

  if (message.type === 'image' && !message.imageUrl) {
    throw new Error("Messages of type image must contain valid imageUrl value");
  }

  const result = await firestore()
    .collection(Collections.Messages)
    .add(newMessage);

  // Retrieve the newly created message data and
  // process it.
  const querySnapshot = await result.get();
  const data: IMessage = {
    ...querySnapshot.data() as IMessage,
    id: result.id
  };

  return data;
}

export const addImageMessage = async (roomId: string, imageUrl: string): Promise<IMessage> => {
  return addMessage({ roomId, imageUrl, type: 'image' });
}