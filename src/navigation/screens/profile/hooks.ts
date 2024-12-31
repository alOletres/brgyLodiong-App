import { useForm } from "react-hook-form";
import { Field } from "../../../components/ListAccordion";
import { ICustomInputProps } from "../../../components/TextInput";
import { IListContent } from "../../../components/ListSection";
import { useEffect, useMemo, useState } from "react";
import { ButtonProps } from "react-native-paper";
import { decodeToken } from "../../../lib/tokenStorage";
import { FindAllResidentsDto } from "./type";

export const useHooks = () => {
  const { control, handleSubmit: onSubmit, reset, watch } = useForm({});
  const [listItems, setListItems] = useState<Field<IListContent>[]>([]);

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
        name: "confirmPassword",
        label: "Confirm password",
        control,
        rules: {
          required: "Confirm password is required",
          validate: (value) => {
            console.log("value", value, newPassword);

            return value === newPassword || "Password do not match";
          },
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
