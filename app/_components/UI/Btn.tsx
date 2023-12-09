"use client";

import React from "react";
import { Button, ButtonProps } from "@nextui-org/react";

export interface IBtnProps extends ButtonProps {}

export default function Btn(props: IBtnProps) {
  return <Button {...props} color={props.color || "primary"} />;
}
