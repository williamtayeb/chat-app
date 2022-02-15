import firestore, { FirebaseFirestoreTypes as FirestoreTypes } from '@react-native-firebase/firestore';
import { limits } from 'config';
import { Collections } from 'services/firestore';
import { IMessage } from './types';

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