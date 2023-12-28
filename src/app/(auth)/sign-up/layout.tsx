import { Metadata } from "next";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function layout({ children }: IProps) {
  return children;
}
