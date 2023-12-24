"use client";

import { Input, InputProps } from "@nextui-org/react";
import React from "react";

interface IProps extends InputProps {
  label?: string;
}

export default function InputComponent(props: IProps) {
  return <Input {...props} />;
}
