import * as React from "react";
import { Divider, List, MD3Colors } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export interface IListContent {
  title: string;
  icon: IconSource;
}

export interface ICustomListSection {
  title: string;
  content: IListContent[];
}

const ListSection = ({ title, content }: ICustomListSection) => (
  <List.Section>
    {/* <List.Subheader variant="bodyLarge"> {title} </List.Subheader> */}
    {content?.length &&
      content.map(({ title, icon }, key) => {
        return (
          <>
            <Divider />
            <List.Item
              key={key}
              title={title}
              left={() => (
                <List.Icon color={MD3Colors.tertiary70} icon={icon} />
              )}
            />
          </>
        );
      })}
  </List.Section>
);

export default ListSection;
