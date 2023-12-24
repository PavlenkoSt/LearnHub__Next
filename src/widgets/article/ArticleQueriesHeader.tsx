import Link from "next/link";
import React from "react";
import type { ArticleCategory } from "@prisma/client";
import BreadcrumbsComponent from "@/src/shared/UI/Breadcrumbs";
import FilterArticle from "@/src/features/article/FilterArticle";
import SearchArticle from "@/src/features/article/SearchArticle";
import CategoriesArticle from "@/src/features/article/CategoriesArticle";
import ResetArticleFilters from "@/src/features/article/ResetArticleFilters";

interface IProps {
  search: string;
  categories: ArticleCategory[];
}

export default function ArticleQueriesHeader({ search, categories }: IProps) {
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
      <div className="flex flex-col justify-between gap-2 py-2 md:flex-row md:items-center">
        <div className="mb-2 flex flex-1 flex-col items-end gap-2 md:mb-0 md:flex-row md:flex-nowrap md:items-center">
          <FilterArticle />
          <CategoriesArticle categories={categories} />
          <SearchArticle search={search} />
          <ResetArticleFilters />
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
