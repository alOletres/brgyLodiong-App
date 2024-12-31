import { View, Text, ScrollView } from "react-native";
import CustomCard from "../../../components/Card";
import { useHooks } from "./hooks";

export function EventScreen() {
  const { content } = useHooks();
  return (
    <ScrollView>
      {content?.length ? (
        content.map(({ content, ...props }, key) => {
          return <CustomCard key={key} {...props} content={content} />;
        })
      ) : (
        <Text>No Events Found</Text>
      )}
    </ScrollView>
  );
}
