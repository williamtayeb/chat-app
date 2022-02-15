import React, { useCallback, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";

import { ChatRoomsView } from "./ChatRoomsView";
import { IChatRoom } from "models/types";
import { getChatRooms } from "models/chatRoom";
import { ChatRoomsNavigationProp } from "navigation";

interface IChatRoomProps {
  navigation: ChatRoomsNavigationProp;
}

export const ChatRooms: React.FC<IChatRoomProps> = ({ navigation }) => {
  const [rooms, setRooms] = useState<IChatRoom[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  
  useEffect(() => {
    SplashScreen.hide();
    retrieveChatRooms();
  }, []);

  const retrieveChatRooms = async () => {
    const chatRooms = await getChatRooms();
    setRooms(chatRooms);
  }

  const handleChatRoomItemPress = (roomId: string) => {
    navigation.navigate('Room', { roomId });
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await retrieveChatRooms();

    setRefreshing(false);
  }, []);

  return (
    <ChatRoomsView
      rooms={rooms}
      onChatRoomItemPress={handleChatRoomItemPress}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
};