export interface INewRoomSubscription {
  userId?: string;
  roomId: string;
  pushNotificationToken?: string | null;
  enabled: boolean;
}