import * as React from "react";
import { Card } from "react-native-paper";
import CardTitle, { ICardTitleProps } from "./CardTitle";
import { ICardContentProps } from "./CardContent";
import CardContent from "./CardContent";
import CardCover from "./CardCover";

export interface ICustomCardProps extends ICardTitleProps {
  content: ICardContentProps[];
  coverImage?: string;
}

const CardComponent = ({
  content,
  coverImage = "https://picsum.photos/700",
  ...props
}: ICustomCardProps) => (
  <Card style={{ marginBottom: 10, borderRadius: 0 }}>
    <CardTitle {...props} />
    <CardContent content={content} />
    {/* <CardCover imageSource={coverImage} /> */}
  </Card>
);

export default CardComponent;
