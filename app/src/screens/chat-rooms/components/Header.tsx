import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "context";
import { ITheme } from "styles";

export const Header: React.FC = () => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Chat Rooms
      </Text>
    </View>
  );
};

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 80,
    borderBottomWidth: 1,
    borderColor: theme.colors.light
  },
  title: {
    ...theme.textBold,
    textTransform: 'uppercase',
    color: theme.colors.white,
  }
});