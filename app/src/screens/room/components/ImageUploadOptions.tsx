import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemeContext } from "context";
import { ITheme } from "styles";

interface IImageUploadOptionsProps {
  onCameraPress: () => null;
  onGalleryPress: () => null;
}

export const ImageUploadOptions: React.FC<IImageUploadOptionsProps> = ({
  onCameraPress,
  onGalleryPress
}) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={onCameraPress}>
          <View style={styles.buttonContentContainer}>
            <Text style={styles.buttonLabel}>
              Camera
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={onGalleryPress}>
          <View style={styles.buttonContentContainer}>
            <Text style={styles.buttonLabel}>
              Gallery
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row'
  },
  buttonContentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center'
  },
  buttonLabel: {
    ...theme.textBold,
    textTransform: 'uppercase',
    color: theme.colors.white,
  }
});