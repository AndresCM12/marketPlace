import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import LogInScreen from "../Screens/AuthScreens/LogIn/main";
import SignUpScreen from "../Screens/AuthScreens/SignUp/main";

export default function AuthNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "LogIn") {
            iconName = focused ? "log-in" : "log-in-outline";
          } else if (route.name === "SignUp") {
            iconName = focused ? "create" : "create-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="LogIn" component={LogInScreen} />
      <Tab.Screen name="SignUp" component={SignUpScreen} />
    </Tab.Navigator>
  );
}
