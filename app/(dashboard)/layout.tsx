import React, { ReactNode } from "react";
import NavBar from "./NavBar";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <NavBar />
      <div className="flex-1 overflow-y-auto rounded-xl bg-secondary px-3">
        {children}
      </div>
    </div>
  );
}
