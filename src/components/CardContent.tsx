import * as React from "react";
import { Card, Text } from "react-native-paper";
import { ICardTitleProps } from "./CardTitle";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";
import { StyleSheet, View } from "react-native";

export interface ICardContentProps extends Pick<ICardTitleProps, "title"> {
  description: string;
  variantTitle?: VariantProp<never>;
  variantDescription?: VariantProp<never>;
}

const CardContent = (props: { content: ICardContentProps[] }) => {
  return (
    <Card.Content>
      {props.content?.length &&
        Object.values(props.content).map(
          (
            {
              title,
              description,
              variantTitle = "titleLarge",
              variantDescription = "bodyMedium",
            },
            index
          ) => {
            return (
              <View
                key={index}
                style={[
                  styles.spacing,
                  {
                    width: "100%",
                  },
                ]}
              >
                <Text
                  variant={variantTitle}
                  style={{ fontSize: 14, lineHeight: 16 }}
                >
                  {title}
                </Text>
                <Text
                  variant={variantDescription}
                  style={{ color: "gray", fontSize: 12, lineHeight: 14 }}
                >
                  {description}
                </Text>
              </View>
            );
          }
        )}
    </Card.Content>
  );
};

export default CardContent;

const styles = StyleSheet.create({
  spacing: {
    paddingBottom: 10,
  },
});
