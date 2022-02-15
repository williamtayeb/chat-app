import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemeContext } from "context";
import { ITheme } from "styles";

import ChevronLeftIcon from 'assets/icons/chevron-left.svg';

interface IHeaderProps {
  onBackPress: () => any;
}

export const Header: React.FC<IHeaderProps> = ({ onBackPress }) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <View style={styles.backButtonContent}>
          <View style={{ paddingLeft: 20 }}>
            <ChevronLeftIcon />
          </View>

          <Text style={styles.backButtonLabel}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.dark,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonLabel: {
    ...theme.textBold,
    textTransform: 'uppercase',
  }
});