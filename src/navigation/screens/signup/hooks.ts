import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useNavigation } from "@react-navigation/native";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
import { createResidentAsync } from "../../../store/slices/resident/resident.effects";
import { CreateResidentsDto } from "./type";
import { isError } from "../../../utils/catchError";

export const useHook = () => {
  const { control, reset, handleSubmit: onSubmit, watch } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useNavigation();
  const { setSnackbarProps } = useSnackBar();

  const password = watch("password");

  const handleSubmit = async ({ ...data }) => {
    try {
      const response = await dispatch(
        createResidentAsync({ ...data } as CreateResidentsDto)
      );

      if (isError(response)) throw new Error(response.message);

      setSnackbarProps({
        children: "Account Successfully created!",
        type: "error",
      });

      navigate("Login");
    } catch (err) {
      const error = err as any;

      setSnackbarProps({
        children: error?.message || "Something went wrong, Try again!",
        type: "error",
      });
    }
  };

  return { control, reset, handleSubmit, onSubmit, password };
};
