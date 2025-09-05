import localStorage from "redux-persist/es/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import userInfoSlice from "./features/user-info-slice";

const rootReducer = combineReducers({
  userInfo: userInfoSlice,
});

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["userInfo", "plaidInfo"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
