import * as React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const FloatingProgressBar = () => {
  return (
    <View style={styles.overlayContainer}>
      {/* Dimmed Background */}
      <View style={styles.dimBackground} />

      {/* Circular Loader */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" animating={true} color="#6200EE" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // Ensure it covers the whole screen
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Bring it above other components
  },
  dimBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  loaderContainer: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
});

export default FloatingProgressBar;
