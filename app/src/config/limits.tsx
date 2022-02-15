interface ILimits {
  getMessagesByRoomId: number,
  getChatRooms: number
}

export const limits: ILimits = {
  getMessagesByRoomId: 50,
  getChatRooms: 50
};