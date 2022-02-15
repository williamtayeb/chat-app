import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from 'navigation/Stack';

export type ChatRoomsNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'ChatRooms'
>;

export type RoomNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Room'
>;