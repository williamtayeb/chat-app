import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { ChatRoomsView } from "./ChatRoomsView";
import { IChatRoom } from "models";

interface IChatRoomProps {
  navigation: any;
}

export const ChatRooms: React.FC<IChatRoomProps> = ({ navigation }) => {
  const [rooms, setRooms] = useState<IChatRoom[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  useEffect(() => {
    SplashScreen.hide();

    setRooms([
      {
        id: 'test',
        name: 'test',
        description: 'test',
        updatedAt: firestore.Timestamp.now()
      },
      {
        id: 'test2',
        name: 'test2',
        description: 'test2',
        updatedAt: firestore.Timestamp.now()
      }
    ]);
  }, []);

  const handleChatRoomItemPress = () => {};
  const handleRefresh = () => {};

  return (
    <ChatRoomsView
      rooms={rooms}
      onChatRoomItemPress={handleChatRoomItemPress}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};