export interface RoomSubscription {
  userId: string;
  roomId: string;
  pushNotificationToken: string;
  enabled: boolean;
}