import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBarNavigation from "./TabBarNavigation";
import AuthNavigation from "./AuthNavigation";
import { useSelector, useDispatch } from "react-redux";

export default function AppMainNavigation() {
  const Stack = createNativeStackNavigator();

  //Store
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  //User is Logged In
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (user.id === "" || user.id === undefined) {
      console.log("⚡Debug: User is not logged in", user);
      setUserLoggedIn(false);
      return;
    }
    console.log("⚡Debug: User is logged in", user);
    setUserLoggedIn(true);
  }, [user]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userLoggedIn ? (
        <Stack.Screen name="Home" component={TabBarNavigation} />
      ) : (
        <Stack.Screen name="Login" component={AuthNavigation} />
      )}
    </Stack.Navigator>
  );
}
