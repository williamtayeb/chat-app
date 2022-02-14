import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { loginWithFacebook, loginWithGoogle } from "services/auth";

import { LoginView } from "./LoginView";

export const Login = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleFacebookPress = async () => {
    try {
      await loginWithFacebook();
    } catch(err) {
      // TODO handle error
    }
  }

  const handleGooglePress = async () => {
    try {
      await loginWithGoogle();
    } catch(err) {
      // TODO handle error
    }
  }

  return (
    <LoginView
      onFacebookLoginPress={handleFacebookPress}
      onGoogleLoginPress={handleGooglePress}
    />
  );
};