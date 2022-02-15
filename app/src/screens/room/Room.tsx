import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { RouteProp } from '@react-navigation/native';

import { RoomView } from "./RoomView";
import { IMessage } from "models/types";
import { getMessagesByRoomId } from "models/message";

interface IRoomProps {
  route: RouteProp<{ params: { roomId: string }}, 'params'>
}

export const Room: React.FC<IRoomProps> = ({ route }) => {
  const { roomId } = route.params;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const [
    displayImageUploadOptions,
    setDisplayImageUploadOptions
  ] = useState<boolean>(false);

  useEffect(() => {
    SplashScreen.hide();
    retrieveMessages();
  }, []);

  const retrieveMessages = async (): Promise<void> => {
    const result = await getMessagesByRoomId(roomId);
    setMessages(result.data);
  }

  const handleBackPress = (): void => {}
  const retrieveMore = (): void => {}
  const handleCameraPress = (): void => {}
  const handleGalleryPress = (): void => {}

  const handleUploadImagePress = (): void => {
    setDisplayImageUploadOptions(!displayImageUploadOptions);
  }

  const handleInputChangeText = (text: string): void => {}
  const sendMessage = (): void => {}

  const dismissError = (): void => {
    setErrorMessage(null);
  }

  return (
    <RoomView
      messages={messages}
      onBackPress={handleBackPress}
      onEndReached={retrieveMore}
      imageUploadOptions={{
        display: displayImageUploadOptions,
        onCameraPress: handleCameraPress,
        onGalleryPress: handleGalleryPress,
      }}
      input={{
        onUploadImagePress: handleUploadImagePress,
        onChangeText: handleInputChangeText,
        defaultValue: inputValue,
        onSendPress: sendMessage
      }}
      error={{
        onDismissPress: dismissError,
        message: errorMessage
      }}
    />
  );
};