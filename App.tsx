import { NavigationContainer } from "@react-navigation/native";
import AppMainNavigation from "./source/Navigation/Main";
import { Provider } from "react-redux";
import { store } from "./source/Store/Store";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppMainNavigation />
      </NavigationContainer>
    </Provider>
  );
}
