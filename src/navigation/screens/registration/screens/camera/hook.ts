import { useState, useRef, useEffect } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setImage } from "../../../../../store/slices/camera/camera.slice";

export const useHooks = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);
  const { goBack } = useNavigation();
  const dispatch = useDispatch();

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const capturePhoto = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo?.uri);
      } catch (error) {
        throw error;
      }
    }
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const handleSave = () => {
    dispatch(setImage(photoUri));
    goBack();
  };

  return {
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
  };
};
