import * as React from "react";
import {
  TextInput as PaperTextInput,
  TextInputProps,
  Text,
} from "react-native-paper";

import { ControllerProps, Controller } from "react-hook-form";
import { GestureResponderEvent } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
/**
 * Input props properties
 * extend {@link TextInputProps} props
 */
type CustomInputProps = TextInputProps &
  Pick<ControllerProps, "control" | "defaultValue" | "name" | "rules"> & {
    icon?: IconSource;
    onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  };

const TextInput = ({
  mode = "outlined",
  control,
  name,
  secureTextEntry,
  rules = {},
  id,
  label,
  icon,
  onPress,
}: CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <PaperTextInput
            id={id}
            label={label}
            mode={mode}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default TextInput;
