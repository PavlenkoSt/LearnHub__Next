"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { navigation } from "./navigation-links";

export default function NavBarMobile() {
  const pathname = usePathname();

  return (
    <div className="relative">
      <Link
        href="/dashboard"
        className="absolute right-[50%] top-[-6px] z-10 flex h-[40px] w-[40px] translate-x-[50%] items-center justify-center rounded-full bg-primary"
      >
        <div className="overflow-hidden rounded-full">
          <Image src="/logo.png" width={30} height={30} alt="LearnHub" />
        </div>
      </Link>
      <div className="flex justify-around bg-primary">
        {navigation.map((nav) => (
          <Link
            key={nav.path}
            href={nav.path}
            className={twMerge(
              "flex h-[55px] flex-1 flex-col items-center justify-center text-white",
              pathname === nav.path && "bg-selected-dark",
            )}
          >
            <nav.Icon size="25px" />
            <div className="text-xs font-bold">{nav.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
