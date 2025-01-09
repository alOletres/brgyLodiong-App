import { useForm } from "react-hook-form";
import { Field } from "../../../components/ListAccordion";
import { ICustomInputProps } from "../../../components/TextInput";
import { IListContent } from "../../../components/ListSection";
import { useEffect, useMemo, useState } from "react";
import { ButtonProps } from "react-native-paper";
import { decodeToken, deleteToken } from "../../../lib/tokenStorage";
import { FindAllResidentsDto } from "./type";
import { ChangePasswordDto } from "../login/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { ChangePasswordAsync } from "../../../store/slices/auth/auth.effect";
import { useSnackBar } from "../../../components/hooks/useSnackBar";
import { useNavigation } from "@react-navigation/native";
import { isError } from "../../../utils/catchError";
import { authSelector } from "../../../store/slices/auth/auth.selector";

export const useHooks = () => {
  const { control, handleSubmit: onSubmit, reset, watch } = useForm({});
  const [listItems, setListItems] = useState<Field<IListContent>[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { setSnackbarProps } = useSnackBar();
  const { navigate } = useNavigation();
  const { isFetching } = useSelector(authSelector);

  const [expandedAccount, setExpandedAccount] = useState<boolean>(true);
  const handleAccountPress = () => setExpandedAccount(!expandedAccount);

  const [expandedSecurity, setExpandedSecurity] = useState<boolean>(false);
  const handleSecurityPress = () => setExpandedSecurity(!expandedSecurity);

  const newPassword = watch("newPassword");

  const fields: Field<ICustomInputProps>[] = [
    {
      fieldType: "text",
      fieldProps: {
        name: "currentPassword",
        label: "Current password",
        control,
        rules: { required: "Current password is required" },
        secureTextEntry: true,
      },
    },
    {
      fieldType: "text",
      fieldProps: {
        name: "newPassword",
        label: "New password",
        control,
        rules: {
          required: "New password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        },
        secureTextEntry: true,
      },
    },
    {
      fieldType: "text",
      fieldProps: {
        name: "confirmPassword",
        label: "Confirm password",
        control,
        rules: {
          required: "Confirm password is required",
          validate: (value) => {
            return value === newPassword || "Password do not match";
          },
        },
        secureTextEntry: true,
      },
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const { email, resident } = (await decodeToken()) as {
        email: string;
        resident: FindAllResidentsDto;
      };

      setListItems([
        {
          fieldType: "list",
          fieldProps: {
            title: `${resident.firstname} ${resident.lastname}`,
            icon: "face-man",
          },
        },

        {
          fieldType: "list",
          fieldProps: { title: email, icon: "email" },
        },
        {
          fieldType: "list",
          fieldProps: { title: resident.contact, icon: "phone" },
        },

        {
          fieldType: "list",
          fieldProps: {
            title: resident.address,
            icon: "google-maps",
          },
        },
      ]);
    };

    fetchUser();
  }, []);

  const handleChangePassword = async ({ ...data }) => {
    try {
      const { email } = (await decodeToken()) as {
        email: string;
      };
      const payload: ChangePasswordDto = {
        ...(data as Omit<ChangePasswordDto, "email">),
        email,
      };

      /**
       * Step 1
       * Change password
       */
      const response = await dispatch(ChangePasswordAsync({ ...payload }));

      if (isError(response)) throw new Error(response.message);

      /**
       * Step 2
       * delete the token
       */
      await deleteToken("accessToken");
      // Step 3 navigate to login page
      navigate("Login");
    } catch (err) {
      const error = err as any;

      setSnackbarProps({
        children:
          error?.message ||
          "Something went wrong, Please check your current password, Try again!",
        type: "error",
      });
    }
  };

  const handleResetForm = () => {
    reset();
  };
  const securityActions: ButtonProps[] = [
    {
      children: "Clear",
      mode: "contained",
      onPress: handleResetForm,
    },
    {
      children: "Submit",
      mode: "contained",
      onPress: onSubmit(handleChangePassword),
    },
  ];

  return {
    fields,
    listItems,
    expandedAccount,
    handleAccountPress,
    handleSecurityPress,
    expandedSecurity,
    securityActions,
    isFetching,
  };
};
