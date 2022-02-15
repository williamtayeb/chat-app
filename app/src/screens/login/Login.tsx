import { getErrorMessage } from "errors";
import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { loginWithFacebook, loginWithGoogle } from "services/auth";

import { LoginView } from "./LoginView";

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

  const handleErrorDismissPress = () => {
    setErrorMessage(null);
  }

  return (
    <LoginView
      onFacebookLoginPress={handleFacebookPress}
      onGoogleLoginPress={handleGooglePress}
      onErrorAlertDismissPress={handleErrorDismissPress}
      errorMessage={errorMessage}
    />
  );
};