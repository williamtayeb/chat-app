import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";

import { LoginView } from "./LoginView";
import { getErrorMessage } from "errors/utils";
import { loginWithFacebook, loginWithGoogle } from "services/auth";

/**
 * Represents the login screen. This container is responsible
 * for handling user interactions with the login view.
 */
export const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleFacebookPress = async () => {
    try {
      await loginWithFacebook();
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  };

  const handleGooglePress = async () => {
    try {
      await loginWithGoogle();
    } catch(err) {
      const message = getErrorMessage(err);
      setErrorMessage(message);
    }
  };

  const handleErrorAlertDismissPress = () => {
    setErrorMessage(null);
  }

  return (
    <LoginView
      onFacebookLoginPress={handleFacebookPress}
      onGoogleLoginPress={handleGooglePress}
      error={{
        onDismissPress: handleErrorAlertDismissPress,
        message: errorMessage
      }}
    />
  );
};