import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ChatRooms, Login, Room } from "screens";
import { Stack } from "./Stack";

interface INavigatorProps {
  linking: any;
  displayLogin: boolean;
}; 

export const Navigator: React.FC<INavigatorProps> = ({
  linking,
  displayLogin
}) => (
  <NavigationContainer linking={linking}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {displayLogin ? (
        <Stack.Screen
          name="Login"
          component={Login}
        />
      ) : (
        <>
          <Stack.Screen
            name="ChatRooms"
            component={ChatRooms}
          />

          <Stack.Screen
            name="Room"
            component={Room}
          />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);