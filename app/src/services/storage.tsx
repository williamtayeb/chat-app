import storage from '@react-native-firebase/storage';

export interface StorageImage {
  fileName: string;
  uri: string;
}

/**
 * Uploads an image to storage and returns its url.
 * @param image Required image data for upload
 * @returns A string of a url that points directly to the image
 * file within the storage.
 */
export const uploadImage = async (image: StorageImage): Promise<string> => {
  const reference = storage().ref(image.fileName);

  await reference.putFile(image.uri);
  const imageUrl = await reference.getDownloadURL();

  return imageUrl;
}