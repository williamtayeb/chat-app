import firestore from '@react-native-firebase/firestore';
const { faker } = require('@faker-js/faker');

import { Collections } from 'services/firestore';
import { INewChatRoom } from './types';

/**
 * Seed the database with random data
 * @param numberOfChatRooms The number of chat rooms to generate
 */
export const seedRandomData = async (numberOfChatRooms: number) => {
  const chatRoomIds = await seedChatRooms(numberOfChatRooms);
};

const seedChatRooms = async (total: number): Promise<string[]> => {
  const chatRoomIds: string[] = [];

  for (let i = 0; i < total; i++) {
    const chatRoom: INewChatRoom = {
      name: generateRandomChatRoomName(),
      description: faker.lorem.sentences(),
      updatedAt: faker.date.past()
    };

    const result = await firestore()
      .collection(Collections.ChatRooms)
      .add(chatRoom);
    
    chatRoomIds.push(result.id);
  }

  return chatRoomIds;
}

const generateRandomChatRoomName = () => {
  const randomWords: string = faker.lorem.words();
  const words = randomWords.split(" ");

  const randomChatRoomName = words
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(" ");
  
  return randomChatRoomName;
}