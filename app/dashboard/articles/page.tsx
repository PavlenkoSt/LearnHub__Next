import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/next-auth.options";
import Pagination from "@/app/_components/UI/Pagination";
import Header from "./Header";
import ArticleCard from "./ArticleCard";
import { ArticleFilterEnum, ISearchParams } from "./types";
import { getFilteredArticlesWithCountAction } from "@/app/_server-actions/articles";

interface IProps {
  searchParams: ISearchParams;
}

const pageSize = 12;

export const dynamic = "force-dynamic";

export default async function Articles({ searchParams }: IProps) {
  const session = await getServerSession(authOptions);

  const page = typeof searchParams.page === "string" ? +searchParams.page : 1;
  const search = searchParams.search || "";
  const filter = searchParams.filter || ArticleFilterEnum.ALL;

  if (!session?.user) redirect("/sign-in");

  const [articles, articlesCount] = await getFilteredArticlesWithCountAction({
    page,
    pageSize,
    search,
    filter,
    userId: session.user.id,
  });

  const totalPages = Math.ceil(articlesCount / pageSize);

  if (totalPages < page) {
    return redirect("/dashboard/articles?page=" + totalPages);
  }

  return (
    <div>
      <Header search={search} />
      <div className="md:px-2">
        {articles.length ? (
          <div>
            <div className="mb-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center">
                <Pagination page={page} total={totalPages} />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 text-center text-xl font-semibold text-primary">
            Articles not found
          </div>
        )}
      </div>
    </div>
  );
}
