import * as React from "react";
import { Avatar, Card } from "react-native-paper";
import CardTitle, { ICardTitleProps } from "./CardTitle";
import { ICardContentProps } from "./CardContent";
import CardContent from "./CardContent";

const LeftContent = ({ ...props }) => (
  <Avatar.Icon {...props} icon="calendar-star" />
);

export interface ICustomCardProps extends ICardTitleProps {
  content: ICardContentProps[];
  coverImage?: string;
}

const CardComponent = ({
  content,
  coverImage = "https://picsum.photos/700",
  ...props
}: ICustomCardProps) => (
  <Card style={{ margin: 10 }}>
    <CardTitle {...props} />
    <CardContent content={content} />
    <Card.Cover source={{ uri: coverImage }} />
  </Card>
);

export default CardComponent;
