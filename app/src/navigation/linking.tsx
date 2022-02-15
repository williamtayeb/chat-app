import { Linking } from "react-native";
import messaging from '@react-native-firebase/messaging';
import { LinkingOptions } from "@react-navigation/native";

import { linkingConfig } from "config";
import { StackParamList } from "./Stack";

const getInitialURL = async () => {
  const url = await Linking.getInitialURL();

  if (url) return url;

  const message = await messaging().getInitialNotification();
  return message?.data?.link;
};

const subscribe = (listener: (url: string) => void) => {
  const onReceiveURL = ({ url }: { url: string }) => listener(url);
  const linkingEventListener = Linking.addEventListener('url', onReceiveURL);

  const unsubscribeNotification = messaging().onNotificationOpenedApp(message => {
    const url = message?.data?.link;
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