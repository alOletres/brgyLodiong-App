import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { LoginAsync } from "../../../store/slices/auth/auth.effect";
import { authSelector } from "../../../store/slices/auth/auth.selector";
import { useEffect } from "react";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
export interface ILoginCredentials {
  username: string;
  password: string;
}
export const useHooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, data, isError } = useSelector(authSelector);
  const { setSnackbarProps } = useSnackBar();

  const {
    control,
    handleSubmit: handleFormSubmit,
    reset,
    getValues,
  } = useForm({
    defaultValues: {},
  });

  const handleSubmit = () => {
    const { ...element } = getValues() as ILoginCredentials;

    dispatch(LoginAsync({ ...element }));
  };

  useEffect(() => {
    setSnackbarProps({
      children: message,
      type: isError ? "error" : "success",
    });
  }, [message, data]);

  return { control, handleFormSubmit, handleSubmit, message };
};
