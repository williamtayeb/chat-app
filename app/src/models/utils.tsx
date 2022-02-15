import firestore from '@react-native-firebase/firestore';
const { faker } = require('@faker-js/faker');

import { Collections } from 'services/firestore';
import { NewChatRoom, NewMessage } from './types';

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
    console.log('Generating room: ', i);

    const chatRoom: NewChatRoom = {
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

const seedMessages = async (chatRoomIds: string[], totalPerRoom: number) => {
  let roomCounter = 0;

  for (const roomId of chatRoomIds) {
    roomCounter++;

    for (let i = 0; i < totalPerRoom; i++) {
      console.log(`[${roomCounter}/${chatRoomIds.length}] Generating message: `, i);

      const message: NewMessage = {
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