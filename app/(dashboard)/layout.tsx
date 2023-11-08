import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-row">
      <Sidebar />
      <div className="flex-1 rounded-xl bg-secondary px-3">{children}</div>
    </div>
  );
}
