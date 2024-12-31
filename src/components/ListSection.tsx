import * as React from "react";
import { Avatar, Divider, List, MD3Colors, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { StyleSheet, View } from "react-native";

export interface IListContent {
  title: string;
  description?: string;
  icon: IconSource;
  date?: string;
  status?: string;
  unread?: boolean;
}

export interface ICustomListSection {
  title?: string;
  content: IListContent[];
}

const ListSection = ({ title, content }: ICustomListSection) => (
  <>
    {title && <Text style={styles.sectionTitle}>{title}</Text>}
    {content?.length &&
      content.map(({ title, description, icon, date, status, unread }, key) => (
        <View key={key}>
          <List.Item
            title={title}
            description={description}
            left={() => (
              <Avatar.Text
                size={40}
                label={getInitials(title)}
                style={styles.avatar}
              />
            )}
            right={() => (
              <View style={styles.rightSection}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.status}>{status}</Text>
              </View>
            )}
            titleStyle={unread ? styles.unread : styles.read}
            descriptionStyle={styles.description}
          />
          <Divider />
        </View>
      ))}
  </>
);

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: MD3Colors.primary30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  avatar: {
    backgroundColor: MD3Colors.primary70,
  },
  unread: {
    fontWeight: "bold",
    fontSize: 16,
  },
  read: {
    fontWeight: "normal",
    fontSize: 16,
  },
  description: {
    color: MD3Colors.neutral40,
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: MD3Colors.neutral50,
  },
  status: {
    fontSize: 12,
    color: MD3Colors.primary40,
    fontWeight: "bold",
  },
});

export default ListSection;
