import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { LoginAsync } from "../../../store/slices/auth/auth.effect";
import { authSelector } from "../../../store/slices/auth/auth.selector";
import { useMemo } from "react";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
import { useNavigation } from "@react-navigation/native";
import { isError } from "../../../utils/catchError";
import { setToken } from "../../../lib/tokenStorage";
export interface ILoginCredentials {
  username: string;
  password: string;
}
export const useHooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, data, isFetching } = useSelector(authSelector);
  const { setSnackbarProps } = useSnackBar();
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit: handleFormSubmit,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const handleSubmit = async ({ ...data }) => {
    try {
      const response = await dispatch(
        LoginAsync({
          ...data,
        } as ILoginCredentials)
      );

      if (isError(response)) throw new Error(response.message);

      const { access_token } = response.payload as { access_token: string };

      await setToken("accessToken", access_token);

      navigate("HomeTabs");
      setSnackbarProps({
        children: "User successfully login!",
        type: "success",
      });
      reset();
    } catch (err) {
      setSnackbarProps({
        children:
          message || "Either Username and Password is incorrect, Try again!",
        type: "error",
      });
    }
  };

  const handleForgotPassword = () => {};

  const handleRegstration = () => {
    navigate("Registration");
  };

  useMemo(async () => {
    if (data?.access_token) {
      await setToken("accessToken", data.access_token);
    }
  }, [data]);

  return {
    control,
    handleFormSubmit,
    handleSubmit,
    message,
    handleForgotPassword,
    handleRegstration,
    isFetching,
  };
};
