import messaging from '@react-native-firebase/messaging';

export const requestPushNotificationPermission = async (): Promise<boolean> => {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  return enabled;
}

export const getPushNotificationToken = async () => {
  let token: string | null = null;
  const hasPermission = await messaging().hasPermission();

  if (hasPermission == messaging.AuthorizationStatus.AUTHORIZED) {
    token = await messaging().getToken();
  }

  return token;
}