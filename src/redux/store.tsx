import {configureStore} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";
import activityReducer from "./slice/activitySlice";
import appReducer from "./slice/appSlice";

const persistConfig = {
    key: 'activity',
    storage: AsyncStorage,
    blacklist: ['isLoading', 'data', 'isError', 'selectedFilter']
};

const persistedReducer = persistReducer(persistConfig, activityReducer);

export const store = configureStore({
    reducer: {
        activity: persistedReducer,
        app: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,})
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;