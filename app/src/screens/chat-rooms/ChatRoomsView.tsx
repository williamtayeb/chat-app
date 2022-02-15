import React, { useContext } from "react";
import { FlatList, RefreshControl, StatusBar, View } from "react-native";

import { ThemeContext } from "context";
import { IChatRoom } from "models/types";
import { ChatRoomItem, Header } from "./components";
import { handleErrorMessage } from "errors/utils";

interface IChatRoomsViewProps {
  rooms: IChatRoom[] | undefined,
  onChatRoomItemPress: (roomId: string) => any;
  refreshing: boolean,
  onRefresh: () => any;
  onErrorAlertDismissPress: () => any;
  errorMessage: string | null | undefined;
}

export const ChatRoomsView: React.FC<IChatRoomsViewProps> = ({
  rooms,
  onChatRoomItemPress,
  refreshing,
  onRefresh,
  onErrorAlertDismissPress,
  errorMessage
}) => {
  const theme = useContext(ThemeContext);
  handleErrorMessage(errorMessage, onErrorAlertDismissPress);

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