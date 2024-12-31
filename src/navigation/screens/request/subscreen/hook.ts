import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import { useSnackBar } from "../../../../components/hooks/useSnackBar";
import { useState } from "react";
import { decodeToken } from "../../../../lib/tokenStorage";
import { CreateRequestDto } from "../type";
import { createRequestAsync } from "../../../../store/slices/request/request.effects";
import { isError } from "../../../../utils/catchError";
import { Option } from "react-native-paper-dropdown";
import { useNavigation } from "@react-navigation/native";

const requestTypes: string[] = ["CERTIFICATE", "CLEARANCE", "PERMIT"];

export const useHooks = () => {
  const { control, handleSubmit: onSubmit, reset } = useForm();

  const dispatch = useDispatch<AppDispatch>();
  const { setSnackbarProps } = useSnackBar();
  const { navigate } = useNavigation();

  const [option, setOption] = useState<Option[]>(
    requestTypes.map((value): Option => {
      return {
        label: value,
        value,
      };
    })
  );

  const handleSubmit = async ({ ...data }) => {
    try {
      const { id } = (await decodeToken()) as { id: number };
      const payload = data as Pick<CreateRequestDto, "requestType" | "purpose">;

      const response = await dispatch(
        createRequestAsync({
          ...payload,
          residentId: id,
        })
      );

      if (isError(response)) throw new Error(response.message);
      navigate("HomeTabs", { screen: "Request" });

      handleFormReset();

      setSnackbarProps({
        children: "Request successfully created!",
        type: "success",
      });
    } catch (err) {
      const error = err as any;
      setSnackbarProps({
        children: error?.message || "Something went wrong, Try again!",
        type: "error",
      });
    }
  };
  const handleFormReset = () => {
    reset();
  };

  return { control, option, handleSubmit, onSubmit, handleFormReset };
};
