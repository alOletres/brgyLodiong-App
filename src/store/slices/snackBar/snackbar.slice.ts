import { createSlice } from "@reduxjs/toolkit";
import { SnackbarProps } from "react-native-paper";

export interface CustomSnackBarProps
  extends Pick<
    SnackbarProps,
    "visible" | "onDismiss" | "action" | "children" | "duration"
  > {
  handleAction?: () => void;
  type: "success" | "error";
}

const initialState: { snackBarProps: CustomSnackBarProps } = {
  snackBarProps: {} as CustomSnackBarProps,
};
const snackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarProps(state, action) {
      return {
        ...state,
        snackBarProps: action.payload,
      };
    },

    clearSnackbarProps(state, action) {
      return { ...state, snackBarProps: action.payload };
    },
  },
});

export const { setSnackbarProps, clearSnackbarProps } = snackBarSlice.actions;

export default snackBarSlice.reducer;
