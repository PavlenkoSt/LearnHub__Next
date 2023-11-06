import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return <div>{children}</div>;
}
