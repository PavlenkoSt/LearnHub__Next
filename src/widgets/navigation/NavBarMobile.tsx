"use client";

import React from "react";
import { navigation } from "@/src/features/navigation/navigation";
import NavLinkMobile from "@/src/features/navigation/NavLinkMobile";
import NavLogoMobile from "@/src/features/navigation/NavLogoMobile";

export default function NavBarMobile() {
  return (
    <div className="relative">
      <NavLogoMobile />
      <div className="flex justify-around bg-primary">
        {navigation.map((nav) => (
          <NavLinkMobile key={nav.path} nav={nav} />
        ))}
      </div>
    </div>
  );
}
