import * as React from "react";
import { Avatar, Card, IconButton } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface ICardTitleProps {
  title: string;
  subtitle?: string;
  icon: IconSource;
}

const CardTitle = ({ icon, ...props }: ICardTitleProps) => {
  return (
    <Card.Title
      titleVariant="titleMedium"
      subtitleVariant="labelSmall"
      {...props}
      left={(props) => <Avatar.Icon {...props} icon={icon} />}
    />
  );
};

export default CardTitle;
