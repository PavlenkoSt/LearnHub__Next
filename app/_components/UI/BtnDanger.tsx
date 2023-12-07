import React from "react";

import Btn, { IBtnProps } from "./Btn";

interface IProps extends IBtnProps {}

export default function BtnDanger(props: IProps) {
  return <Btn {...props} color="danger" />;
}
