import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { RouteProp, useNavigationState } from '@react-navigation/native';
import { FirebaseFirestoreTypes as FirestoreTypes } from '@react-native-firebase/firestore';

import { RoomView } from "./RoomView";
import { IMessage } from "models/types";
import { getMessagesByRoomId } from "models/message";
import { getErrorMessage } from "errors/utils";
import { RoomNavigationProp } from "navigation/types";

interface IRoomProps {
  route: RouteProp<{ params: { roomId: string }}, 'params'>,
  navigation: RoomNavigationProp
}

export const Room: React.FC<IRoomProps> = ({ route, navigation }) => {
  const { roomId } = route.params;
  const navigationIndex = useNavigationState(state => state.index);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const [lastVisible, setLastVisible] =
    useState<FirestoreTypes.QueryDocumentSnapshot<FirestoreTypes.DocumentData>>();

  const [
    displayImageUploadOptions,
    setDisplayImageUploadOptions
  ] = useState<boolean>(false);

  useEffect(() => {
    SplashScreen.hide();
    retrieveMessages();
  }, [roomId]);

  const retrieveMessages = async (): Promise<void> => {
    try {
      const result = await getMessagesByRoomId(roomId);

      setMessages(result.data);
      setLastVisible(result.lastVisible);
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  }

  const handleBackPress = (): void => {
    if (navigationIndex == 0) {
      // Navigate to the chat rooms screen if there is no 
      // screen to go back to. This usually happens if we
      // get here by deep links.
      navigation.navigate('ChatRooms');
      return;
    }

    navigation.goBack();
  }

  const retrieveMoreMessages = async (): Promise<void> => {
    try {
      const result = await getMessagesByRoomId(roomId, lastVisible);

      // Append the retrieved data onto existing messages
      setMessages([...messages, ...result.data]);
      setLastVisible(result.lastVisible);
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  }

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
      onEndReached={retrieveMoreMessages}
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