import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";

interface IRoomProps {
  route: any
}

export const Room: React.FC<IRoomProps> = ({ route }) => {
  const { roomId } = route.params;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>Room: {roomId}</Text>
    </View>
  );
};