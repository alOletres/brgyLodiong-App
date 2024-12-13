import React from "react";
import { Dropdown, DropdownProps } from "react-native-paper-dropdown";
import { ControllerProps, Controller } from "react-hook-form";
import { Text } from "react-native-paper";

export interface ICustomDropdownProps
  extends DropdownProps,
    Pick<ControllerProps, "control" | "defaultValue" | "name" | "rules"> {}

const CustomDropdown = ({
  control,
  name,
  rules,
  defaultValue,
  ...props
}: ICustomDropdownProps) => (
  <Controller
    name={name}
    rules={rules}
    control={control}
    defaultValue={defaultValue || ""}
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <>
        <Dropdown
          {...props}
          value={value} // Bind the value from hook-form
          onSelect={onChange}
        />
        {error && (
          <Text style={{ color: "red", alignSelf: "stretch" }}>
            {error.message || "This field is required"}
          </Text>
        )}
      </>
    )}
  />
);

export default CustomDropdown;
