import { ThemeContext } from "context";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ITheme } from "styles";
import { IButtonProps } from "./IButtonProps";

/**
 * Represents an outlined button
 * @param onPress Callback for handling button press
 * @param label The text to display in the middle of the button
 */
export const ButtonOutline: React.FC<IButtonProps> = ({
  onPress,
  label
}) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
};

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.light,
    paddingTop: 19,
    paddingBottom: 19,
  },
  label: {
    ...theme.textBold,
    textTransform: 'uppercase',
    color: theme.colors.lighter,
  }
});