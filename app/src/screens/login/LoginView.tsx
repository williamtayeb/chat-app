import React, { useContext } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { Theme } from "styles/types";
import { ThemeContext } from "context";
import { Button, ButtonOutline } from "./components";
import { handleErrorMessage } from "errors/utils";
import { ErrorProp } from "errors";

import Logo from "assets/logo.svg";

interface LoginViewProps {
  onFacebookLoginPress: () => any;
  onGoogleLoginPress: () => any;
  error: ErrorProp;
}

/**
 * Presentational component that is responsible for rendering
 * the login view.
 */
export const LoginView: React.FC<LoginViewProps> = ({
  onFacebookLoginPress,
  onGoogleLoginPress,
  error
}) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  handleErrorMessage(error.message, error.onDismissPress);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={theme.colors.dark}
        barStyle="light-content"
      />

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.buttonContainer}>
          <View style={{ marginBottom: 20 }}>
            <Button
              onPress={onFacebookLoginPress}
              label="Login with Facebook"
            />
          </View>

          <ButtonOutline
            onPress={onGoogleLoginPress}
            label="Login with Google"
          />
        </View>
      </View>
    </View>
  );
};

const buildStyleSheet = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.black,
  },
  logoContainer: {
    flex: 1,
    marginTop: 160 
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 80,
    paddingLeft: 32,
    paddingRight: 32
  }
});