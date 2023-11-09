import React, { ReactNode } from "react";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      <div className="hidden md:flex">
        <NavBarDesktop />
      </div>
      <div className="flex-1 overflow-y-auto rounded-xl bg-secondary px-3 pb-4 md:pb-0">
        {children}
      </div>
      <div className="visible md:hidden">
        <NavBarMobile />
      </div>
    </div>
  );
}
