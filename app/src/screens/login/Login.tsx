import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";

export const Login = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};