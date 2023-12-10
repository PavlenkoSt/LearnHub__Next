"use client";

import React from "react";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";

interface IProps extends Omit<SelectProps, "children"> {
  options: {
    value: string | number;
    label: string;
  }[];
}

export default function SelectComponent(props: IProps) {
  const { options, ...rest } = props;
  return (
    <Select {...rest}>
      {options.map((animal) => (
        <SelectItem key={animal.value} value={animal.value}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  );
}
