import React, { ReactNode } from "react";
import NavBarDesktop from "@/src/widgets/navigation/NavBarDesktop";
import NavBarMobile from "@/src/widgets/navigation/NavBarMobile";
import Header from "@/src/widgets/navigation/Header";
import AuthWrapper from "./AuthWrapper";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <AuthWrapper>
      <div className="flex h-screen flex-col overflow-hidden md:flex-row">
        <div className="hidden md:flex">
          <NavBarDesktop />
        </div>
        <div className="flex-1 overflow-y-auto bg-secondary pb-4 md:pb-0">
          <Header />
          <div>{children}</div>
        </div>
        <div className="visible md:hidden">
          <NavBarMobile />
        </div>
      </div>
    </AuthWrapper>
  );
}
