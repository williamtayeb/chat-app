import React from "react";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";

import { ChatRooms, Login, Room } from "screens";
import { Stack, StackParamList } from "./Stack";

interface NavigatorProps {
  linking: LinkingOptions<StackParamList>;
  displayLogin: boolean;
}; 

export const Navigator: React.FC<NavigatorProps> = ({
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