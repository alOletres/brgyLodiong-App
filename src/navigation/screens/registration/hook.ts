import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "../../../store/slices/camera/camera.slice";
import { selectCamera } from "../../../store/slices/camera/camera.selector";

export const useHooks = () => {
  const { navigate } = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const dispatch = useDispatch();
  const image = useSelector(selectCamera);

  const uploadImageFiles = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (file.assets?.length) {
        const [imageFile] = file.assets;

        // setImageUri(imageFile.uri); // Store the image URI in state
        dispatch(setImage(imageFile.uri));
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleOpenCamera = () => navigate("CameraScreen");

  const handleNext = () => navigate("SignUp");

  useEffect(() => {
    setImageUri(image);
  }, [image]);

  return { uploadImageFiles, handleOpenCamera, imageUri, handleNext };
};
