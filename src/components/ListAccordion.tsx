import * as React from "react";
import {
  Button,
  List,
  ListAccordionProps,
  ButtonProps,
  Text,
} from "react-native-paper";
import { IListContent } from "./ListSection";
import { ICustomInputProps } from "./TextInput";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { useListAccordion } from "./hooks/useListAccordion";
import CustomTextInput from "../components/TextInput";
import { View } from "react-native";

export interface Field<T extends ICustomInputProps | IListContent> {
  fieldType: "list" | "text";
  fieldProps: T;
}

export interface ICustomListAcordionProps extends ListAccordionProps {
  sectionTitle: string;
  icon: IconSource;
  fields: Field<ICustomInputProps | IListContent>[];
  expanded: boolean;
  actions?: ButtonProps[];
  handlePress: () => void;
}

const ListAccordion = ({
  expanded,
  handlePress,
  sectionTitle,
  fields,
  actions,
  ...accordionProps
}: ICustomListAcordionProps) => {
  const { isListItem, isTextInput } = useListAccordion();

  return (
    <List.Section title={sectionTitle}>
      <List.Accordion
        title={accordionProps.title}
        left={(props) => <List.Icon {...props} icon={accordionProps.icon} />}
        expanded={expanded}
        onPress={handlePress}
      >
        {fields?.length ? (
          fields.map((field, key) => {
            if (isListItem(field)) {
              const { title, icon } = field.fieldProps;

              return (
                <List.Item
                  key={key}
                  title={title}
                  left={(props) => <List.Icon {...props} icon={icon} />}
                />
              );
            }

            if (isTextInput(field)) {
              return (
                <CustomTextInput
                  style={{ width: "100%", marginHorizontal: 10 }}
                  key={key}
                  {...field.fieldProps}
                />
              );
            }
          })
        ) : (
          <Text>No Content Found</Text>
        )}

        {actions?.length && (
          <View
            style={{
              marginTop: 4,
              justifyContent: "flex-end",
              width: "100%",
              flexDirection: "row",
            }}
          >
            {actions.map((props, key) => {
              return (
                <View key={key} style={{ padding: 4 }}>
                  <Button {...props} />
                </View>
              );
            })}
          </View>
        )}
      </List.Accordion>
    </List.Section>
  );
};

export default ListAccordion;
