interface Limits {
  getMessagesByRoomId: number,
  getChatRooms: number
}

export const limits: Limits = {
  getMessagesByRoomId: 50,
  getChatRooms: 50
};