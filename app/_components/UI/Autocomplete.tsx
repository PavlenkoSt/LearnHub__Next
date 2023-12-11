import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@nextui-org/react";
import React from "react";

interface IOption {
  value: string | number;
  label: string;
}

interface IProps extends Omit<AutocompleteProps, "children" | "defaultItems"> {
  items: IOption[];
}

export default function AutocompleteComponent({ items, ...rest }: IProps) {
  return (
    <Autocomplete {...rest} allowsCustomValue defaultItems={items}>
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
