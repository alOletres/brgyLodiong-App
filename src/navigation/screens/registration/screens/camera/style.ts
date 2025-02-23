import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  cameraView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f3f3f3",
  },
  headerButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 15,
    left: 0,
    paddingHorizontal: 15,
  },

  captureButtonContainer: {
    width: 70,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,.3)",
    position: "absolute",
    bottom: 50,
    left: "50%",
    transform: [{ translateX: -35 }],
    padding: 10,
  },
  camera: {
    flex: 1,
  },
  tooltip: {
    width: 130,
    position: "absolute",
    bottom: 130,
    left: "50%",
    transform: [{ translateX: -65 }],
    textAlign: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#f3f3f3",
    backgroundColor: "#f3f3f3",
    borderRadius: 12,
  },
  saveButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  button: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  imagePreview: {
    flex: 1,
  },
  capturedImage: {
    flex: 1,
  },
});
