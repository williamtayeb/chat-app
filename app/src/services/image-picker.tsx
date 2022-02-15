import { CameraOptions, ImagePickerResponse, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { IImage } from "./storage";

export const getImageFromCamera = async (): Promise<IImage | null> => {
  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'back'
  };
  
  const result = await launchCamera(options);
  return processResult(result);
};

export const getImageFromGallery = async (): Promise<IImage | null> => {
  const result = await launchImageLibrary({ mediaType: 'photo' });
  return processResult(result);
}

const processResult = (result: ImagePickerResponse): IImage | null => {
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