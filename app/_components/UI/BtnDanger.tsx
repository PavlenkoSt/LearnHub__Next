import React from "react";

import Btn, { IBtnProps } from "./Btn";
import { twMerge } from "tailwind-merge";

interface IProps extends IBtnProps {}

export default function BtnDanger(props: IProps) {
  return (
    <Btn
      {...props}
      className={twMerge(props.className, "bg-red-600 hover:bg-red-500")}
    />
  );
}
