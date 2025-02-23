import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useHooks } from "./hook";
import { Button, IconButton } from "react-native-paper";
import { CameraView } from "expo-camera";
import { styles } from "./style";

export function CameraScreen() {
  const {
    permission,
    requestPermission,
    photoUri,
    setPhotoUri,
    cameraRef,
    facing,
    toggleCameraFacing,
    handleCameraReady,
    capturePhoto,
    handleSave,
    goBack,
  } = useHooks();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button
          onPress={requestPermission}
          mode="outlined"
          children="Grant permission"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraView}>
        {photoUri ? (
          <View style={styles.imagePreview}>
            <Image source={{ uri: photoUri }} style={styles.capturedImage} />
          </View>
        ) : (
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            onCameraReady={handleCameraReady}
          />
        )}

        <View style={styles.headerButtonsContainer}>
          {photoUri ? (
            <TouchableOpacity onPress={() => setPhotoUri(undefined)}>
              <IconButton icon="restore" size={35} iconColor="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={goBack}>
              <IconButton icon="close" size={35} iconColor="#fff" />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={toggleCameraFacing}>
            <IconButton icon="cached" size={35} iconColor="#fff" />
          </TouchableOpacity>
        </View>

        {photoUri && <Text style={styles.tooltip}>Click To Save Photo!</Text>}
        <View style={styles.captureButtonContainer}>
          {photoUri ? (
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <IconButton icon="content-save" iconColor="#444" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={capturePhoto} style={styles.button}>
              <IconButton
                icon="checkbox-blank-circle-outline"
                iconColor="#fff"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
