export interface NewRoomSubscription {
  userId?: string;
  roomId: string;
  pushNotificationToken?: string | null;
  enabled: boolean;
}