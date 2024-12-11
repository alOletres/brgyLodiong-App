import * as React from "react";
import { Card, Button, ButtonProps } from "react-native-paper";

interface ICustomButtonProps extends Omit<ButtonProps, "children"> {
  name: string;
}

interface ICardActionsProps {
  component: ICustomButtonProps[];
}
const CardActions = ({ component }: ICardActionsProps) => (
  <Card.Actions>
    {component?.length &&
      component.map(({ name, ...props }, key) => {
        return (
          <Button key={key} {...props}>
            {name}
          </Button>
        );
      })}
  </Card.Actions>
);

export default CardActions;
