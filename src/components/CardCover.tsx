import * as React from "react";
import { Card } from "react-native-paper";

const CardCover = ({ imageSource }: { imageSource: string }) => (
  <Card.Cover style={{ borderRadius: 0 }} source={{ uri: imageSource }} />
);

export default CardCover;
