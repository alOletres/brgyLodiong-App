import { View, Text, ScrollView } from "react-native";
import CustomCard from "../../../components/Card";
import { useHooks } from "./hooks";

export function EventScreen() {
  const { content } = useHooks();
  return (
    <ScrollView>
      <CustomCard
        title="Event title"
        subtitle="Sub title"
        icon="calendar-star"
        content={content}
      />

      <CustomCard
        title="Event title"
        subtitle="Sub title"
        icon="calendar-star"
        content={content}
      />
    </ScrollView>
  );
}
