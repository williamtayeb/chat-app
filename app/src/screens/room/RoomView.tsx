import React, { useContext } from "react";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";

import { ThemeContext } from "context";
import { ITheme } from "styles";
import { handleErrorMessage } from "errors/utils";
import { Header, ImageUploadOptions, MessageInput, MessageItem } from "./components";
import { IMessage } from "models/types";

interface IRoomViewProps {
  messages: IMessage[];
  onBackPress: () => any;
  onEndReached: () => any;
  imageUploadOptions: {
    display: boolean;
    onCameraPress: () => any;
    onGalleryPress: () => any;
  };
  input: {
    onUploadImagePress: () => any;
    onChangeText: (text: string) => any;
    defaultValue: string | undefined;
    onSendPress: () => any;
  }
  error: {
    onDismissPress: () => any;
    message: string | null | undefined;
  }
}

export const RoomView: React.FC<IRoomViewProps> = ({
  messages,
  onBackPress,
  onEndReached,
  imageUploadOptions,
  input,
  error
}) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  handleErrorMessage(error.message, error.onDismissPress);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={theme.colors.black} />
      <Header onBackPress={onBackPress} />

      <View style={styles.messagesContainer}>
        <FlatList
          inverted={true}
          contentContainerStyle={{ flexGrow: 1 }}
          data={messages}
          onEndReached={onEndReached}
          renderItem={({ item }) =>
            <MessageItem
              author={item.author}
              avatarImageUrl={item.avatarImageUrl}
              content={item.content}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
              type={item.type}
            />
          }
        />
      </View>

      {imageUploadOptions.display && (
        <ImageUploadOptions
          onCameraPress={imageUploadOptions.onCameraPress}
          onGalleryPress={imageUploadOptions.onGalleryPress}
        />
      )}

      <MessageInput
        onUploadImagePress={input.onUploadImagePress}
        onChangeText={input.onChangeText}
        defaultValue={input.defaultValue}
        onSendPress={input.onSendPress}
      />
    </View>
  );
};

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
  messagesContainer: {
    flex: 1,
    backgroundColor: theme.colors.light
  }
});