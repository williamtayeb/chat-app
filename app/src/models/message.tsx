import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Collections } from 'services/firestore';
import { IMessage } from './types';

interface IResult {
  data: IMessage[],
  lastVisible: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
}

export const getMessagesByRoomId = async (roomId: string): Promise<IResult> => {
  const LIMIT = 50;

  const querySnapshot = await firestore()
    .collection(Collections.Messages)
    .where('roomId', '==', roomId)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)
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