import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { loginWithFacebook } from "services/auth";

import { LoginView } from "./LoginView";

export const Login = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleFacebookPress = async () => {
    try {
      loginWithFacebook();
    } catch(err) {
      // TODO handle error
    }
  }

  const handleGooglePress = () => {}

  return (
    <LoginView
      onFacebookLoginPress={handleFacebookPress}
      onGoogleLoginPress={handleGooglePress}
    />
  );
};