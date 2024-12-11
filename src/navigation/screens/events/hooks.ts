import { useState } from "react";
import { ICardContentProps } from "../../../components/CardContent";

export const useHooks = () => {
  const [content, setContent] = useState<ICardContentProps[]>([
    {
      title: "Description",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      title: "Where",
      description: "Culo Molave Zamboanga del sur",
    },
    {
      title: "When",
      description: "December 4, 2024",
    },
  ]);

  return { content };
};
