import Link from "next/link";
import React from "react";
import BreadcrumbsComponent from "@/app/_components/UI/Breadcrumbs";
import HeaderFilter from "./HeaderFilter";
import HeaderSearch from "./HeaderSearch";

interface IProps {
  search: string;
}

export default function Header({ search }: IProps) {
  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Articles", href: "/dashboard/articles", pressable: !!search },
  ];

  if (search) {
    breadcrumbs.push({
      name: `Search "${search}"`,
      href: `/dashboard/articles?search="${search}"`,
      pressable: false,
    });
  }

  return (
    <header className="md:px-2 md:pt-2">
      <BreadcrumbsComponent links={breadcrumbs} />
      <div className="flex flex-col justify-between py-2 md:flex-row  md:items-center">
        <div className="mb-2 flex flex-1 items-center gap-2 md:mb-0">
          <HeaderFilter />
          <HeaderSearch search={search} />
        </div>
        <Link
          href="/dashboard/articles/create"
          className="flex w-full items-center justify-center gap-4 rounded-md bg-primary px-4 py-2 text-center text-white transition-all hover:bg-selected-dark md:w-auto"
        >
          + Create article
        </Link>
      </div>
    </header>
  );
}
