import { Card } from "react-native-paper";
import TextInput from "../../../components/TextInput";
import { useHooks } from "./hooks";
import CardActions from "../../../components/CardActions";
import CardTitle from "../../../components/CardTitle";
import { StyleSheet, View } from "react-native";
import DropDown from "../../../components/Dropdown";

export function RequestScreen() {
  const { control, option, onSubmit, handleSubmit, handleFormReset } =
    useHooks();

  return (
    <View style={styles.container}>
      <Card style={styles.spacing}>
        <CardTitle title="Request Documents" icon="account-arrow-right" />
        <View style={{ paddingHorizontal: 5 }}>
          <DropDown
            control={control}
            name="type"
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

      <Card style={styles.spacing}>
        <CardTitle title="Request History" icon="history" />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },

  spacing: {
    marginBottom: 30,
    borderRadius: 0,
  },
});
