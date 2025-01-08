import { Card, Icon, List, MD3Colors, Text } from "react-native-paper";
import { useHooks } from "./hooks";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import ListSection from "../../../components/ListSection";
import AnimatedFab from "./../../../components/AnimatedFab";

export function RequestScreen() {
  const { dataSource, fetchRequestByUser } = useHooks();

  return (
    <>
      <ScrollView style={styles.container}>
        <Card style={styles.spacing}>
          <List.Section>
            <List.Subheader style={styles.header}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text variant="titleSmall">Recent</Text>
                <TouchableOpacity onPress={fetchRequestByUser}>
                  <Icon size={20} source="refresh" />
                </TouchableOpacity>
              </View>
            </List.Subheader>
          </List.Section>
          {dataSource?.length ? (
            dataSource.map((props, key) => {
              return (
                <ListSection
                  key={key + 5}
                  title={props.title}
                  content={props.content}
                />
              );
            })
          ) : (
            <Text>No request found ...</Text>
          )}
        </Card>
      </ScrollView>
      <AnimatedFab
        visible={true}
        extended={true}
        label="Create Request"
        animateFrom="right"
      />
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
