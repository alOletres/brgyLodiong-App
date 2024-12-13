import { Field } from "../ListAccordion";
import { IListContent } from "../ListSection";
import { ICustomInputProps } from "../TextInput";

export const useListAccordion = () => {
  const isListItem = (
    field: Field<ICustomInputProps | IListContent>
  ): field is Field<IListContent> => field.fieldType === "list";

  const isTextInput = (
    field: Field<ICustomInputProps | IListContent>
  ): field is Field<ICustomInputProps> => field.fieldType === "text";

  return { isListItem, isTextInput };
};
