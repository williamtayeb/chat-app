interface Config {
  linking: {
    prefix: string,
    roomPath: string
  }
}

export const config: Config = {
  linking: {
    prefix: 'chatapp://',
    roomPath: 'room'
  }
};