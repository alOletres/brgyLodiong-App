import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { useNavigation } from "@react-navigation/native";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
import { createResidentAsync } from "../../../store/slices/resident/resident.effects";
import { CreateResidentsDto } from "./type";
import { isError } from "../../../utils/catchError";
import { useState } from "react";
import { selectResident } from "../../../store/slices/resident/resident.selector";

export const useHook = () => {
  const { control, reset, handleSubmit: onSubmit, watch } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { navigate } = useNavigation();
  const { setSnackbarProps } = useSnackBar();
  const { message } = useSelector(selectResident);

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const password = watch("password");

  const handleSubmit = async ({ ...data }) => {
    try {
      setIsFetching(true);
      const response = await dispatch(
        createResidentAsync({ ...data } as CreateResidentsDto)
      );

      if (isError(response)) throw new Error(response.message);

      setIsFetching(false);
      setSnackbarProps({
        children: "Account Successfully created!",
        type: "success",
      });

      navigate("Login");
    } catch (err) {
      setIsFetching(false);
      setSnackbarProps({
        children: message || "Something went wrong, Try again!",
        type: "error",
      });
    }
  };

  return { isFetching, control, reset, handleSubmit, onSubmit, password };
};
