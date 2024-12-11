import { Card } from "react-native-paper";
import TextInput from "../../../components/TextInput";
import { useHooks } from "./hooks";
import CardActions from "../../../components/CardActions";
import CardTitle from "../../../components/CardTitle";
import { StyleSheet, View } from "react-native";

export function RequestScreen() {
  const { control } = useHooks();

  return (
    <View style={styles.container}>
      <Card style={styles.spacing}>
        <CardTitle title="Request Documents" icon="account-arrow-right" />
        <View style={{ paddingHorizontal: 5 }}>
          <TextInput
            control={control}
            name="type"
            label="Select Request type"
            dense={true}
            rules={{ required: "Request type is required" }}
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
            },
            {
              name: "Submit",
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
    margin: 10,
  },

  spacing: {
    marginBottom: 30,
  },
});
