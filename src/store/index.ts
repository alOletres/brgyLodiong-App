import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/auth/auth.slice";
import SnackBarReducer from "./slices/snackBar/snackbar.slice";
import RequestReducer from "./slices/request/request.slice";
import EventsReducer from "./slices/events/events.slice";
import ResidentReducer from "./slices/resident/resident.slice";
const reducer = combineReducers({
  auth: AuthReducer,
  snackbar: SnackBarReducer,
  request: RequestReducer,
  events: EventsReducer,
  residents: ResidentReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
