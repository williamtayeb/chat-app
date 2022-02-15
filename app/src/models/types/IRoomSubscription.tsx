export interface IRoomSubscription {
  userId: string;
  roomId: string;
  pushNotificationToken: string;
  enabled: boolean;
}