import React, { useContext } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ThemeContext } from "context";
import { ITheme } from "styles";

import ImageIcon from 'assets/icons/image.svg';
import SendIcon from 'assets/icons/send.svg';

interface IMessageInputProps {
  onUploadImagePress: () => any;
  onChangeText: (text: string) => any;
  defaultValue: string | undefined;
  onSendPress: () => any;
}

export const MessageInput: React.FC<IMessageInputProps> = ({
  onUploadImagePress,
  onChangeText,
  defaultValue,
  onSendPress
}) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onUploadImagePress}>
        <View style={styles.iconContainer}>
          <ImageIcon />
        </View>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          placeholder="Please type your message..."
          placeholderTextColor={theme.colors.text}
          onChangeText={onChangeText}
          defaultValue={defaultValue}
          multiline
        />
      </View>
      
      <TouchableOpacity onPress={onSendPress}>
        <View style={styles.iconContainer}>
          <SendIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.dark,
    flexDirection: 'row'
  },
  iconContainer: {
    padding: 20,
    alignItems: 'center'
  },
  input: {
    ...theme.textBold,
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: 120
  }
});