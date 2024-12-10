import React from "react";
import { Snackbar } from "react-native-paper";
import { useSnackBar } from "./hooks/useSnackBar";

const CustomSnackbar = () => {
  const { snackbarProps, onDismissSnackBar } = useSnackBar();
  const { type, onDismiss, duration = 2000, ...props } = snackbarProps;

  return (
    <Snackbar
      style={{ backgroundColor: type === "success" ? "green" : "maroon" }}
      onDismiss={onDismissSnackBar}
      {...props}
      duration={duration}
    />
  );
};

export default CustomSnackbar;
