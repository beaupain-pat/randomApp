import {Text} from 'react-native';
import {Provider} from "react-redux";
import store, {persistor} from "./src/redux/store";
import {NavigationContainer} from "@react-navigation/native";
import {BottomTabs} from "./src/navigation/navigator/bottom-tab.navigator";
import {PersistGate} from "redux-persist/integration/react";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <NavigationContainer>
                <BottomTabs />
            </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}