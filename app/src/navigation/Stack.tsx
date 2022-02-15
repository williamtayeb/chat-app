import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**
 * Defines the available screen names and their associated
 * param names and types. 'undefined' means that a screen
 * does not have any params.
 */
export type StackParamList = {
  Login: undefined;
  ChatRooms: undefined;
  Room: { roomId: string };
};

export const Stack = createNativeStackNavigator<StackParamList>();