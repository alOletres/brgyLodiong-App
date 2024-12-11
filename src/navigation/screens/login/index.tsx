import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import TextInput from "../../../components/TextInput";
import { useHooks } from "./hook";
import { Button } from "react-native-paper";
import { Image } from "expo-image";
import ImageLogo from "../../../../assets/logo.png";

export function LoginScreen(): React.JSX.Element {
  const {
    control,
    handleFormSubmit,
    handleSubmit,
    handleForgotPassword,
    handleSignUp,
  } = useHooks();

  return (
    <View style={styles.container}>
      <View style={[styles.center, styles.spacing]}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <Image
            source={ImageLogo}
            style={{
              width: 100,
              height: 100,
              marginRight: 10,
            }}
          />
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 16 }}>Document Request App</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              © 2024 All Rights Reserved
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.spacing}>
        <TextInput
          control={control}
          name="username"
          label="Username"
          placeholder="Username"
          dense={true}
          rules={{ required: "Username is required" }}
        />
      </View>

      <View style={styles.spacing}>
        <TextInput
          control={control}
          name="password"
          label="Password"
          secureTextEntry={true}
          dense={true}
          rules={{ required: "Password is required" }}
        />
      </View>

      <View style={[styles.submit, styles.spacing]}>
        <Button
          mode="contained"
          icon="lock-open"
          onPress={handleFormSubmit(handleSubmit)}
        >
          Sign in
        </Button>
      </View>

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
    padding: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  spacing: {
    marginVertical: 5, // Adjust vertical spacing
  },
  submit: {
    paddingTop: 10,
  },
  linksContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#1E90FF", // Blue color for links
    marginVertical: 5,
    textDecorationLine: "underline",
  },
});
