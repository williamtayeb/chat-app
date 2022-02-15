import React, { useCallback, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";

import { ChatRoomsView } from "./ChatRoomsView";
import { IChatRoom } from "models/types";
import { getChatRooms } from "models/chatRoom";
import { ChatRoomsNavigationProp } from "navigation";
import { getErrorMessage } from "errors/utils";

interface IChatRoomProps {
  navigation: ChatRoomsNavigationProp;
}

export const ChatRooms: React.FC<IChatRoomProps> = ({ navigation }) => {
  const [rooms, setRooms] = useState<IChatRoom[]>();
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
      onErrorAlertDismissPress={handleErrorAlertDismissPress}
      errorMessage={errorMessage}
    />
  );
};