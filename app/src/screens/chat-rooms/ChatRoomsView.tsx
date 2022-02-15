import React, { useContext } from "react";
import { FlatList, RefreshControl, StatusBar, View } from "react-native";

import { ThemeContext } from "context";
import { IChatRoom } from "models";
import { ChatRoomItem, Header } from "./components";

interface IChatRoomsViewProps {
  rooms: IChatRoom[] | undefined,
  onChatRoomItemPress: (roomId: string) => any;
  refreshing: boolean,
  onRefresh: () => any;
}

export const ChatRoomsView: React.FC<IChatRoomsViewProps> = ({
  rooms,
  onChatRoomItemPress,
  refreshing,
  onRefresh
}) => {
  const theme = useContext(ThemeContext);

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