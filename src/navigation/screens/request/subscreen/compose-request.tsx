import TextInput from "../../../../components/TextInput";
import DropDown from "../../../../components/Dropdown";
import CardActions from "../../../../components/CardActions";
import CardTitle from "../../../../components/CardTitle";
import { Card, MD3Colors } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useHooks } from "./hook";
import FloatingProgressBar from "../../../../components/ProgressBar";

export function ComposeRequestScreen() {
  const {
    control,
    option,
    handleSubmit,
    onSubmit,
    handleFormReset,
    isFetching,
  } = useHooks();

  return (
    <>
      <Card style={styles.spacing}>
        <CardTitle title="Request Documents" icon="account-arrow-right" />
        <View style={{ paddingHorizontal: 5 }}>
          <DropDown
            control={control}
            name="requestType"
            label="Select Request"
            rules={{ required: "Request type is required" }}
            options={option}
            mode="outlined"
          />

          <TextInput
            control={control}
            name="purpose"
            label="Purpose"
            placeholder="eq: For Work"
            dense={true}
            rules={{ required: "Purpose is required" }}
          />
        </View>
        <CardActions
          component={[
            {
              name: "Clear",
              onPress: handleFormReset,
            },
            {
              name: "Submit",
              onPress: onSubmit(handleSubmit),
            },
          ]}
        />
      </Card>
      {isFetching && <FloatingProgressBar />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: MD3Colors.neutral70,
  },
  spacing: {
    borderRadius: 0,
    paddingHorizontal: 10,
  },
});
