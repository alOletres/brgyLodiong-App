import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/auth/auth.slice";
import SnackBarReducer from "./slices/snackBar/snackbar.slice";

const reducer = combineReducers({
  auth: AuthReducer,
  snackbar: SnackBarReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
