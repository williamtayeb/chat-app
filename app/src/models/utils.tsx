import firestore from '@react-native-firebase/firestore';
const { faker } = require('@faker-js/faker');

import { Collections } from 'services/firestore';
import { INewChatRoom, INewMessage } from './types';

/**
 * Seed the database with random data
 * @param numberOfChatRooms The number of chat rooms to generate
 * @param numberOfMessagesPerRoom The number of messages that
 * should be generated for each generated chat room.
 */
export const seedRandomData = async (
  numberOfChatRooms: number, 
  numberOfMessagesPerRoom: number
) => {
  const chatRoomIds = await seedChatRooms(numberOfChatRooms);
  await seedMessages(chatRoomIds, numberOfMessagesPerRoom);
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

const seedMessages = async (chatRoomIds: string[], totalPerRoom: number): Promise<void> => {
  for (const roomId of chatRoomIds) {
    for (let i = 0; i < totalPerRoom; i++) {
      const message: INewMessage = {
        uid: faker.datatype.uuid(),
        roomId,
        author: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatarImageUrl: faker.image.avatar(),
        content: faker.lorem.sentences(),
        createdAt: faker.date.past(),
        type: 'text'
      };
      
      await firestore()
        .collection(Collections.Messages)
        .add(message);
    }
  }
}

const generateRandomChatRoomName = () => {
  const randomWords: string = faker.lorem.words();
  const words = randomWords.split(" ");

  const randomChatRoomName = words
    .map(word => word[0].toUpperCase() + word.substring(1))
    .join(" ");
  
  return randomChatRoomName;
}