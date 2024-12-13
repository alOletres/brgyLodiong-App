import React from "react";
import { Snackbar } from "react-native-paper";
import { useSnackBar } from "./hooks/useSnackBar";
import { StyleSheet } from "react-native";

const CustomSnackbar = () => {
  const { snackbarProps, onDismissSnackBar } = useSnackBar();
  const { type, onDismiss, duration = 2000, ...props } = snackbarProps;

  return (
    <Snackbar
      style={{ backgroundColor: type === "success" ? "green" : "maroon" }}
      onDismiss={onDismissSnackBar}
      {...props}
      duration={duration}
      wrapperStyle={styles.snackbar}
    />
  );
};

export default CustomSnackbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  snackbar: {
    position: "absolute",
    top: 50, // Position at the top
    left: 0,
    right: 0,
  },
});
