import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface IProps {
  nav: {
    name: string;
    path: string;
    Icon: IconType;
  };
  isCollapsed: boolean;
}

export default function NavLinkDesktop({ nav, isCollapsed }: IProps) {
  const pathname = usePathname();

  return (
    <Link
      key={nav.path}
      href={nav.path}
      className={twMerge(
        "flex items-center gap-2 px-3 py-3 font-medium text-white hover:bg-selected-dark",
        pathname.includes(nav.path) && "bg-selected-dark",
      )}
    >
      <div className="h-[25px] w-[25px]">
        <nav.Icon size="25px" />
      </div>
      <div
        className={twMerge(
          "opacity-0 transition-all",
          isCollapsed && "opacity-100",
        )}
      >
        {nav.name}
      </div>
    </Link>
  );
}
