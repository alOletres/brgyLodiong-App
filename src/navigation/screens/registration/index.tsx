import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useHooks } from "./hook";
import { Image } from "expo-image";
import FrontDefaultId from "../../../../assets/front id.jpg";

const RegistrationScreen = () => {
  const { uploadImageFiles, handleOpenCamera, imageUri, handleNext } =
    useHooks();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",

        height: "100%",
        width: "100%",
        gap: 10,
        alignItems: "center",
      }}
    >
      <View>
        {!imageUri ? (
          <>
            <Image
              source={FrontDefaultId}
              style={{ width: 400, height: 250, marginTop: 20 }}
              contentFit="contain"
            />
            <Text style={{ textAlign: "center" }}>
              Upload your **Front Valid ID**
            </Text>
          </>
        ) : (
          <Image
            source={{
              uri: imageUri,
            }}
            style={{ width: 200, height: 200, marginTop: 20 }}
            contentFit="contain"
          />
        )}
      </View>
      <View style={{ width: "100%", gap: 10, padding: 10 }}>
        <Button
          children="Upload Image"
          mode="contained"
          onPress={uploadImageFiles}
        />
        <Button
          children="Capture Image"
          mode="outlined"
          onPress={handleOpenCamera}
        />

        {/* Show Next Button only when image is selected */}
        {imageUri && (
          <Button buttonColor="#078691" mode="contained" onPress={handleNext}>
            Next
          </Button>
        )}
      </View>
    </View>
  );
};

export default RegistrationScreen;
