import { useForm } from "react-hook-form";
import { Field } from "../../../components/ListAccordion";
import { ICustomInputProps } from "../../../components/TextInput";
import { IListContent } from "../../../components/ListSection";
import { useState } from "react";
import { ButtonProps } from "react-native-paper";

export const useHooks = () => {
  const { control, handleSubmit: onSubmit, reset, watch } = useForm({});

  const [expandedAccount, setExpandedAccount] = useState<boolean>(true);
  const handleAccountPress = () => setExpandedAccount(!expandedAccount);

  const [expandedSecurity, setExpandedSecurity] = useState<boolean>(false);
  const handleSecurityPress = () => setExpandedSecurity(!expandedSecurity);

  const currentPassword = watch("currentPassword");

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
        name: "confirmPassword",
        label: "Confirm password",
        control,
        rules: {
          required: "Confirm password is required",
          validate: (value) =>
            value === currentPassword || "Password do not match",
        },
        secureTextEntry: true,
      },
    },
    {
      fieldType: "text",
      fieldProps: {
        name: "newPassword",
        label: "New password",
        control,
        rules: { required: "New password is required" },
        secureTextEntry: true,
      },
    },
  ];

  const listItems: Field<IListContent>[] = [
    {
      fieldType: "list",
      fieldProps: { title: "John Doe", icon: "face-man" },
    },

    {
      fieldType: "list",
      fieldProps: { title: "johndoe@gmail.com", icon: "email" },
    },
    {
      fieldType: "list",
      fieldProps: { title: "0926 391 9845", icon: "phone" },
    },

    {
      fieldType: "list",
      fieldProps: {
        title: "Bahamas, United States of America",
        icon: "google-maps",
      },
    },
  ];

  const handleChangePassword = ({ ...data }) => {
    console.log("data", data);
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
  };
};
