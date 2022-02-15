import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { RouteProp, useNavigationState } from '@react-navigation/native';
import { FirebaseFirestoreTypes as FirestoreTypes } from '@react-native-firebase/firestore';

import { RoomView } from "./RoomView";
import { IMessage } from "models/types";
import { addImageMessage, addTextMessage, getMessagesByRoomId } from "models/message";
import { getErrorMessage } from "errors/utils";
import { RoomNavigationProp } from "navigation/types";
import { getImageFromCamera, getImageFromGallery } from "services/image-picker";
import { IImage, uploadImage } from "services/storage";
import { requestPushNotificationPermission } from "services/messaging";
import { addRoomSubscription, checkUserRoomSubscriptionExists } from "models/room-subscription";

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

  const [
    askForPushNotifications,
    setAskForPushNotifications
  ] = useState<boolean>(false);

  const [
    displayPushNotificationAlert,
    setDisplayPushNotificationAlert
  ] = useState<boolean>(false);

  useEffect(() => {
    SplashScreen.hide();

    retrieveMessages();
    checkRoomSubscriptionStatus();
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

  const handleCameraPress = async (): Promise<void> => {
    setDisplayImageUploadOptions(false);

    try {
      const image = await getImageFromCamera();
      if (!image) return;

      await processImage(image);
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  }

  const handleGalleryPress = async (): Promise<void> => {
    setDisplayImageUploadOptions(false);

    try {
      const image = await getImageFromGallery();
      if (!image) return;

      await processImage(image);
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  }

  /**
   * Upload the image to storage and store related data.
   * Finally update the state to with the new image message.
   * @param image The image to process
   */
  const processImage = async (image: IImage) => {
    const imageUrl = await uploadImage(image);
    const newMessage = await addImageMessage(roomId, imageUrl);

    // Append the new message in front of all of the other
    // messages.
    setMessages([newMessage, ...messages])
  }

  const handleUploadImagePress = (): void => {
    setDisplayImageUploadOptions(!displayImageUploadOptions);
  }

  const handleInputChangeText = (text: string): void => {
    setInputValue(text);
  }

  const sendMessage = async (): Promise<void> => {
    if (!inputValue || inputValue.length == 0) return;

    try {
      const newMessage = await addTextMessage(roomId, inputValue);

      setMessages([newMessage, ...messages])
      setInputValue('');

      if (askForPushNotifications) {
        setAskForPushNotifications(false);
        setDisplayPushNotificationAlert(true);
      }
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  }

  const dismissError = (): void => {
    setErrorMessage(null);
  }

  const enablePushNotifications = async (): Promise<void> => {
    setDisplayPushNotificationAlert(false);

    try {
      const hasPermission = await requestPushNotificationPermission();
      if (!hasPermission) {
        await disablePushNotifications();
        return;
      }

      await addRoomSubscription({ roomId, enabled: true });
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  }

  const disablePushNotifications = async (): Promise<void> => {
    setDisplayPushNotificationAlert(false);

    try {
      await addRoomSubscription({ roomId, enabled: false });
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  }

  const checkRoomSubscriptionStatus = async (): Promise<void> => {
    try {
      const exists = await checkUserRoomSubscriptionExists(roomId);

      if (!exists) {
        setAskForPushNotifications(true);
        return;
      }

      setAskForPushNotifications(false);
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  };

  if (displayPushNotificationAlert) {
    Alert.alert(
      "Push Notifications",
      "Would you like to receive push notifications from this chat room?",
      [
        {
          text: 'Decline',
          onPress: disablePushNotifications,
          style: 'cancel'
        },
        {
          text: 'Accept',
          onPress: enablePushNotifications
        }
      ]
    );
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