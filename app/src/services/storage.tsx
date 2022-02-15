import storage from '@react-native-firebase/storage';

export interface IImage {
  fileName: string;
  uri: string;
}

export const uploadImage = async (image: IImage): Promise<string> => {
  const reference = storage().ref(image.fileName);

  await reference.putFile(image.uri);
  const imageUrl = await reference.getDownloadURL();

  return imageUrl;
}