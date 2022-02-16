import React, { useContext } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import { ThemeContext } from "context";
import { Theme } from "styles/types";
import { handleErrorMessage } from "errors/utils";
import { Header, ImageUploadOptions, MessageInput, MessageItem } from "./components";
import { Message } from "models/types";
import { ErrorProp } from "errors";

interface RoomViewProps {
  messages: Message[];
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
  error: ErrorProp;
}

/**
 * Presentational component that is responsible for rendering
 * the view of the room screen.
 */
export const RoomView: React.FC<RoomViewProps> = ({
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
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.dark}
        barStyle="light-content"
      />

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
    </SafeAreaView>
  );
};

const buildStyleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.dark
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: theme.colors.light
  }
});