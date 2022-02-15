import React, { useContext } from "react";
import { FlatList, RefreshControl, StatusBar, View } from "react-native";

import { ThemeContext } from "context";
import { ChatRoom } from "models/types";
import { ChatRoomItem, Header } from "./components";
import { handleErrorMessage } from "errors/utils";
import { ErrorProp } from "errors";

interface ChatRoomsViewProps {
  rooms: ChatRoom[] | undefined,
  onChatRoomItemPress: (roomId: string) => any;
  refreshing: boolean,
  onRefresh: () => any;
  error: ErrorProp;
}

export const ChatRoomsView: React.FC<ChatRoomsViewProps> = ({
  rooms,
  onChatRoomItemPress,
  refreshing,
  onRefresh,
  error
}) => {
  const theme = useContext(ThemeContext);
  handleErrorMessage(error.message, error.onDismissPress);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.black }}>
      <StatusBar backgroundColor={theme.colors.dark} />
      
      <FlatList
        ListHeaderComponent={Header}
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <ChatRoomItem 
            id={item.id}
            name={item.name}
            description={item.description}
            onPress={onChatRoomItemPress}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};