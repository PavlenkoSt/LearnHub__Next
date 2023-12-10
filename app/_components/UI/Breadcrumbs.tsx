"use client";

import React from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface IBreadcrumb {
  name: string;
  href: string;
  pressable?: boolean;
}

interface IProps {
  links: IBreadcrumb[];
}

export default function BreadcrumbsComponent({ links }: IProps) {
  const pathname = usePathname();

  return (
    <Breadcrumbs variant="bordered" className="hidden md:flex">
      {links.map((link) => (
        <BreadcrumbItem key={link.href}>
          {(pathname === link.href && link.pressable === undefined) ||
          link.pressable === false ? (
            link.name
          ) : (
            <Link href={link.href}>{link.name}</Link>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
