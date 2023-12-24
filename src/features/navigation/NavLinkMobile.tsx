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
}

export default function NavLinkMobile({ nav }: IProps) {
  const pathname = usePathname();

  return (
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
  );
}
