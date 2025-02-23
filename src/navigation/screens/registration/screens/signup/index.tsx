import { ScrollView, View } from "react-native";
import { Card, Button } from "react-native-paper";
import CardTitle from "../../../../../components/CardTitle";
import { useHook } from "./hooks";
import CustomTextInput from "../../../../../components/TextInput";
import FloatingProgressBar from "../../../../../components/ProgressBar";

export function SignUpScreen() {
  const {
    control,
    reset: handleReset,
    onSubmit,
    handleSubmit,
    password,
    isFetching,
  } = useHook();
  return (
    <>
      {isFetching && <FloatingProgressBar />}
      <ScrollView style={{ paddingHorizontal: 5 }}>
        <Card style={{ borderRadius: 0, padding: 10 }}>
          <CardTitle
            title="Fill-in the required fields"
            icon="account-plus-outline"
          />

          <CustomTextInput
            label="Firstname"
            name="firstname"
            control={control}
            rules={{ required: "Firstname is required" }}
          />
          <CustomTextInput
            label="Lastname"
            name="lastname"
            control={control}
            rules={{ required: "Lastname is required" }}
          />
          <CustomTextInput
            label="Email"
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
          />
          <CustomTextInput
            label="Mobile number"
            name="contact"
            control={control}
            rules={{ required: "Mobile number is required" }}
          />

          <CustomTextInput
            label="Address"
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
          />

          <CustomTextInput
            label="Enter your password"
            name="password"
            control={control}
            secureTextEntry={true}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />
          <CustomTextInput
            label="Confirm password"
            name="confirmPassword"
            control={control}
            secureTextEntry={true}
            rules={{
              validate: (value) => {
                return value === password || "Password do not match";
              },
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 10,
              paddingInline: "auto",
            }}
          >
            <Button
              children="Clear"
              mode="outlined"
              style={{ marginRight: 10 }}
              onPress={handleReset}
            />
            <Button
              children="Submit"
              mode="contained"
              onPress={onSubmit(handleSubmit)}
            />
          </View>
        </Card>
      </ScrollView>
    </>
  );
}
