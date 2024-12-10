import { View, StyleSheet } from "react-native";
import TextInput from "../../../components/TextInput";
import { useHooks } from "./hook";
import { Button } from "react-native-paper";
import { Image } from "expo-image";
import ImageLogo from "../../../../assets/logo.png";

export function LoginScreen(): React.JSX.Element {
  const { control, handleFormSubmit, handleSubmit } = useHooks();

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={ImageLogo}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
      <TextInput
        control={control}
        name="username"
        label="Username"
        placeholder="Username"
        dense={true}
        rules={{ required: "Username is required" }}
      />

      <TextInput
        control={control}
        name="password"
        label="Password"
        secureTextEntry={true}
        dense={true}
        rules={{ required: "Password is required" }}
      />

      <View style={styles.submit}>
        <Button
          mode="contained"
          icon="lock-open"
          onPress={handleFormSubmit(handleSubmit)}
        >
          Sign in
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    marginVertical: 10,
    padding: 20,
  },
  submit: {
    paddingTop: 10,
  },
});
