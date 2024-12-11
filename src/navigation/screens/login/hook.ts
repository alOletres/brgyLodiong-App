import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { LoginAsync } from "../../../store/slices/auth/auth.effect";
import { authSelector } from "../../../store/slices/auth/auth.selector";
import { useEffect } from "react";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
import { useNavigation } from "@react-navigation/native";
export interface ILoginCredentials {
  username: string;
  password: string;
}
export const useHooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, data, isError } = useSelector(authSelector);
  const { setSnackbarProps } = useSnackBar();
  const { navigate } = useNavigation();

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

  const handleForgotPassword = () => {};

  const handleSignUp = () => {};

  useEffect(() => {
    const type = isError ? "error" : "success";
    setSnackbarProps({
      children: message,
      type,
    });

    if (type === "success" && message) {
      navigate("HomeTabs");
    }
  }, [message, data]);

  return {
    control,
    handleFormSubmit,
    handleSubmit,
    message,
    handleForgotPassword,
    handleSignUp,
  };
};
