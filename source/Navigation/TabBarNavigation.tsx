import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PublishPage from "../Screens/TabBarScreens/Publish/main";
import StorePage from "../Screens/TabBarScreens/Shop/main";
import SettingsPage from "../Screens/TabBarScreens/Settings/main";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function TabBarNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Store") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Publish") {
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "cog" : "cog-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Store" component={StorePage} />
      <Tab.Screen name="Publish" component={PublishPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}
