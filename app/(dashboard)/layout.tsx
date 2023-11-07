import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white p-2">
      <div className="flex h-full flex-1 flex-row">
        <Sidebar />
        <div className="bg-secondary flex-1 rounded-xl border-2 border-gray-200 px-3">
          {children}
        </div>
      </div>
    </div>
  );
}
