import storage from '@react-native-firebase/storage';

export interface StorageImage {
  fileName: string;
  uri: string;
}

export const uploadImage = async (image: StorageImage): Promise<string> => {
  const reference = storage().ref(image.fileName);

  await reference.putFile(image.uri);
  const imageUrl = await reference.getDownloadURL();

  return imageUrl;
}