import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import NextLink from "@/src/shared/UI/NextLink";

interface IProps {
  isCollapsed: boolean;
}

export default function NavLogoDesktop({ isCollapsed }: IProps) {
  return (
    <NextLink
      href="/dashboard"
      className={twMerge(
        "group flex items-center gap-3 overflow-hidden px-3 transition-all",
        !isCollapsed && "translate-y-[7px]",
      )}
    >
      <div
        className={twMerge(
          "h-[40px] w-[40px] min-w-[40px] transition-all",
          !isCollapsed && "h-[25px] w-[25px] min-w-[25px]",
        )}
      >
        <Image src="/logo.png" width={50} height={50} alt="LearnHub" />
      </div>
      <div
        className={twMerge(
          "font-bold text-white opacity-100 transition-all group-hover:underline",
          !isCollapsed && "opacity-0",
        )}
      >
        LearnHub
      </div>
    </NextLink>
  );
}
