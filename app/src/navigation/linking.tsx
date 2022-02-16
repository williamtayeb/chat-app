import { Linking } from "react-native";
import messaging from '@react-native-firebase/messaging';
import { LinkingOptions } from "@react-navigation/native";

import { linkingConfig } from "config";
import { StackParamList } from "./Stack";

/**
 * This function is invoked whenever the app launches from
 * the quit state.
 * @returns Should return a string if there is a URL to handle,
 * otherwise `undefined`
 */
const getInitialURL = async () => {
  const url = await Linking.getInitialURL();
  if (url) return url;

  const message = await messaging().getInitialNotification();
  return message?.data?.link;
};

/**
 * Gets invoked whenever we receive a push notification when
 * the app is in the background.
 * @param listener Should be called with a URL string whenever
 * there is a new URL to handle.
 */
const subscribe = (listener: (url: string) => void) => {
  const onReceiveURL = ({ url }: { url: string }) => listener(url);
  const linkingEventListener = Linking.addEventListener('url', onReceiveURL);

  // Listen for push notifications
  const unsubscribeNotification = messaging().onNotificationOpenedApp(message => {
    const url = message?.data?.link;

    // Call the listener provided by React Navigation to
    // handle the URL
    if (url) listener(url);
  });

  return () => {
    linkingEventListener.remove();
    unsubscribeNotification();
  };
};

export const linking: LinkingOptions<StackParamList> = {
  prefixes: linkingConfig.prefixes,
  config: {
    screens: linkingConfig.screens
  },
  getInitialURL,
  subscribe,
};