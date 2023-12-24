"use client";

import React from "react";
import { TextAreaProps, Textarea } from "@nextui-org/react";

interface IProps extends TextAreaProps {}

export default function TextArea(props: IProps) {
  return <Textarea {...props} />;
}
