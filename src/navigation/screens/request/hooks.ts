import { useState } from "react";
import { useForm } from "react-hook-form";
import { Option } from "react-native-paper-dropdown";
import { getToken } from "../../../lib/tokenStorage";

const requestTypes: string[] = ["CERTIFICATE", "CLEARANCE", "PERMIT"];

export const useHooks = () => {
  const { control, handleSubmit: onSubmit, reset } = useForm();

  const [option, setOption] = useState<Option[]>(
    requestTypes.map((value): Option => {
      return {
        label: value,
        value,
      };
    })
  );

  const handleSubmit = async ({ ...data }) => {
    console.log("data", data);
  };

  const handleFormReset = () => {
    reset();
  };

  return { control, option, handleSubmit, onSubmit, handleFormReset };
};
