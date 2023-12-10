import BreadcrumbsComponent from "@/app/_components/UI/Breadcrumbs";
import Link from "next/link";
import React from "react";

interface IProps {
  search: string;
}

export default function Header({ search }: IProps) {
  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Articles", href: "/dashboard/articles", pressable: true },
  ];

  if (search) {
    breadcrumbs.push({
      name: `Search "${search}"`,
      href: `/dashboard/articles?search="${search}"`,
      pressable: false,
    });
  }

  return (
    <header className="flex items-center justify-between py-2 md:px-2">
      <BreadcrumbsComponent links={breadcrumbs} />
      <Link
        href="/dashboard/articles/create"
        className="flex w-full items-center justify-center gap-4 rounded-md bg-primary px-4 py-2 text-center text-white transition-all hover:bg-selected-dark md:w-auto"
      >
        + Create article
      </Link>
    </header>
  );
}
