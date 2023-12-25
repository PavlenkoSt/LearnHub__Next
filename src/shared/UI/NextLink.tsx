"use client";

import Link from "next/link";
import React, { ComponentProps, MouseEventHandler } from "react";
import { UrlObject } from "url";
import { usePathname } from "next/navigation";
import { dispatchRouteChangeEvent } from "../utilts/routeEvents";

export interface INextLinkProps
  extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string | UrlObject;
}
export default function NextLink({
  href,
  className,
  children,
  onClick,
  ...props
}: INextLinkProps) {
  const pathname = usePathname();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    onClick?.(e);
    if (pathname !== href) {
      dispatchRouteChangeEvent("start");
    }
  };

  return (
    <Link className={className} href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
