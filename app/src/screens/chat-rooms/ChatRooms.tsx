import React, { useCallback, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";

import { ChatRoomsView } from "./ChatRoomsView";
import { ChatRoom } from "models/types";
import { getChatRooms } from "models/chat-room";
import { ChatRoomsNavigationProp } from "navigation/types";
import { getErrorMessage } from "errors/utils";

interface ChatRoomsProps {
  navigation: ChatRoomsNavigationProp;
}

export const ChatRooms: React.FC<ChatRoomsProps> = ({ navigation }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  
  useEffect(() => {
    SplashScreen.hide();
    retrieveChatRooms();
  }, []);

  const retrieveChatRooms = async () => {
    try {
      const chatRooms = await getChatRooms();
      setRooms(chatRooms);
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  }

  const handleChatRoomItemPress = (roomId: string) => {
    navigation.navigate('Room', { roomId });
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await retrieveChatRooms();

    setRefreshing(false);
  }, []);

  const handleErrorAlertDismissPress = () => {
    setErrorMessage(null);
  }

  return (
    <ChatRoomsView
      rooms={rooms}
      onChatRoomItemPress={handleChatRoomItemPress}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      error={{
        onDismissPress: handleErrorAlertDismissPress,
        message: errorMessage
      }}
    />
  );
};