import React, { ReactNode } from "react";
import NavBarDesktop from "./NavBarDesktop";
import NavBarMobile from "./NavBarMobile";
import HeaderSearch from "./HeaderSearch";
import HeaderSignOut from "./HeaderSignOut";
import HeaderProfile from "./HeaderProfile";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden md:flex-row">
      <div className="hidden md:flex">
        <NavBarDesktop />
      </div>
      <div className="flex-1 overflow-y-auto bg-secondary pb-4 md:pb-0">
        <div className="flex h-[50px] items-center justify-end gap-2 bg-gray-200 px-5 md:h-[60px]">
          <HeaderProfile />
          <HeaderSearch />
          <HeaderSignOut />
        </div>
        <div className="px-1 sm:px-3">{children}</div>
      </div>
      <div className="visible md:hidden">
        <NavBarMobile />
      </div>
    </div>
  );
}
