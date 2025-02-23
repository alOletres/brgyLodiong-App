import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { useNavigation } from "@react-navigation/native";
import { useSnackBar } from "../../../../../components/hooks/useSnackBar";
import { createResidentAsync } from "../../../../../store/slices/resident/resident.effects";
import { CreateResidentsDto } from "./type";
import { isError } from "../../../../../utils/catchError";
import { useMemo, useState } from "react";
import { selectResident } from "../../../../../store/slices/resident/resident.selector";
import { selectCamera } from "../../../../../store/slices/camera/camera.selector";
import { resetImage } from "../../../../../store/slices/camera/camera.slice";

export const useHook = () => {
  const { control, reset, handleSubmit: onSubmit, watch } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useNavigation();
  const { setSnackbarProps } = useSnackBar();
  const { message } = useSelector(selectResident);

  const stateImage = useSelector(selectCamera);

  const imageUri = useMemo(() => stateImage, [stateImage]);

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const password = watch("password");

  const handleSubmit = async ({ ...data }) => {
    try {
      setIsFetching(true);

      const formData = new FormData();

      const payload = { ...data } as CreateResidentsDto;

      for (const element of Object.keys(payload)) {
        const key = element as keyof CreateResidentsDto;
        if (payload[key]) {
          formData.append(key, String(payload[key]));
        }
      }

      console.log("imageUri", imageUri);

      // Ensure `imageUri` is a valid file URI
      if (imageUri) {
        formData.append("image", {
          uri: imageUri,
          name: "frontImageID.jpg",
          type: "image/jpg",
        } as unknown as Blob);
      }

      const response = await dispatch(createResidentAsync(formData)).unwrap();

      if (isError(response)) throw new Error(response.message);

      setIsFetching(false);
      setSnackbarProps({
        children: "Account Successfully created!",
        type: "success",
      });

      dispatch(resetImage());

      navigate("Login");
    } catch (err) {
      console.log("error", err);

      setIsFetching(false);
      setSnackbarProps({
        children: message || "Something went wrong, Try again!",
        type: "error",
      });
    }
  };

  return { isFetching, control, reset, handleSubmit, onSubmit, password };
};
