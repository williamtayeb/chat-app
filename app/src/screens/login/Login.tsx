import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";

import Logo from "assets/logo.svg";

export const Login = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>Login</Text>
      <Logo />
    </View>
  );
};