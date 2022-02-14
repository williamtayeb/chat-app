import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

import { LoginView } from "./LoginView";

export const Login = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleFacebookPress = () => {}
  const handleGooglePress = () => {}

  return (
    <LoginView
      onFacebookLoginPress={handleFacebookPress}
      onGoogleLoginPress={handleGooglePress}
    />
  );
};