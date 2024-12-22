import { useState } from "react";
import { useForm } from "react-hook-form";
import { Option } from "react-native-paper-dropdown";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
import { createRequestAsync } from "../../../store/slices/request/request.effects";
import { decodeToken } from "../../../lib/tokenStorage";
import { CreateRequestDto } from "./type";
import { isError } from "../../../utils/catchError";

const requestTypes: string[] = ["CERTIFICATE", "CLEARANCE", "PERMIT"];

export const useHooks = () => {
  const { control, handleSubmit: onSubmit, reset } = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { setSnackbarProps } = useSnackBar();

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
