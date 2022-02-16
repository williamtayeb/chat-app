import { CameraOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { StorageImage } from "./storage";

/**
 * Launches the camera that allows the user to take a photo
 * and returns the relevant data back.
 * @returns Image data in a format that is compatible with
 * uploading to storage.
 */
export const getImageFromCamera = async (): Promise<StorageImage | null> => {
  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back'
  };
  
  const result = await launchCamera(options);
  return processResult(result);
};

/**
 * Launches the gallery that allows the user to select an image
 * and returns the relevant data back.
 * @returns Image data in a format that is compatible with
 * uploading to storage.
 */
export const getImageFromGallery = async (): Promise<StorageImage | null> => {
  const result = await launchImageLibrary({ mediaType: 'photo' });
  return processResult(result);
}

const processResult = (result: ImagePickerResponse): StorageImage | null => {
  // If the user did not select any images then simply
  // return null
  if (!result.assets) return null;

  // Select a single image
  const asset = result.assets[0];

  if (!asset.fileName) {
    throw new Error("Invalid image file name");
  }

  if (!asset.uri) {
    throw new Error("Invalid image uri");
  }

  return {
    fileName: asset.fileName,
    uri: asset.uri
  };
}