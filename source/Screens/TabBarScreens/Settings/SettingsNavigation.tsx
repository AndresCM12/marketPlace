import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsHomeScreen from "./Screens/SettingsHomeScreen";
import PublishedOffersScreen from "./Screens/PublishedOffersScreen";
import SavedOffersScreen from "./Screens/SavedOffersScreen";

const Stack = createNativeStackNavigator();

export default function SettingsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="homeSettings" component={SettingsHomeScreen} />
      <Stack.Screen name="savedOffers" component={SavedOffersScreen} />
      <Stack.Screen name="publishedOffers" component={PublishedOffersScreen} />
    </Stack.Navigator>
  );
}
