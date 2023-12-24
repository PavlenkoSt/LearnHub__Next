"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxChevronRight } from "react-icons/rx";
import { navigation } from "@/src/features/navigation/navigation";
import NavLinkDesktop from "@/src/features/navigation/NavLinkDesktop";
import NavLogoDesktop from "@/src/features/navigation/NavLogoDesktop";

export default function NavBarDesktop() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={twMerge(
        "relative h-screen w-12 bg-primary py-2 transition-all",
        isCollapsed && "w-44",
      )}
    >
      <div
        onClick={() => setIsCollapsed((prev) => !prev)}
        className={twMerge(
          "absolute right-[-10px] top-[18px] z-10 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-2 border-selected-dark bg-secondary text-primary transition-all",
          isCollapsed && "rotate-180",
        )}
      >
        <RxChevronRight />
      </div>

      <NavLogoDesktop isCollapsed={isCollapsed} />

      <div className="mt-10 flex flex-col overflow-hidden">
        {navigation.map((nav) => (
          <NavLinkDesktop key={nav.path} nav={nav} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  );
}
