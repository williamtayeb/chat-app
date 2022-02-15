import React, { useContext } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { ITheme } from "styles";
import { ThemeContext } from "context";
import { Button, ButtonOutline } from "./components";
import { handleErrorMessage } from "errors";

import Logo from "assets/logo.svg";

interface ILoginViewProps {
  onFacebookLoginPress: () => any;
  onGoogleLoginPress: () => any;
  onErrorAlertDismissPress: () => any;
  errorMessage: string | null | undefined;
}

/**
 * Presentational component that is responsible for rendering
 * the login view.
 * @param onFacebookLoginPress Callback for handling when the
 * facebook login button has been pressed.
 * @param onGoogleLoginPress Callback for handling when the
 * google login button has been pressed.
 * @param onErrorAlertDismiss Callback function for handling
 * when the dismiss button on the error alert has been pressed.
 * @param errorMessage A string that contains a possible error
 * message.
 */
export const LoginView: React.FC<ILoginViewProps> = ({
  onFacebookLoginPress,
  onGoogleLoginPress,
  onErrorAlertDismissPress,
  errorMessage
}) => {
  const theme = useContext(ThemeContext);
  const styles = buildStyleSheet(theme);

  handleErrorMessage(errorMessage, onErrorAlertDismissPress);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={theme.colors.dark} />

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

const buildStyleSheet = (theme: ITheme) => StyleSheet.create({
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