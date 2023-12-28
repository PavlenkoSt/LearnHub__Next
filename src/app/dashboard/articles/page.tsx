import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Pagination from "@/src/shared/UI/Pagination";
import { getFilteredArticlesWithCountAction } from "@/src/entities/actions/articles";
import { getCategoriesAction } from "@/src/entities/actions/categories";
import {
  ArticleFilterEnum,
  IArticleSearchParams,
} from "@/src/entities/types/ArticleQueries";
import ArticleCard from "@/src/features/article/ArticleCard";
import ArticleQueriesHeader from "@/src/widgets/article/ArticleQueriesHeader";
import PageContainer from "@/src/shared/components/PageContainer";

interface IProps {
  searchParams: IArticleSearchParams;
}

const pageSize = 12;

export const metadata: Metadata = {
  title: "Articles",
};

export default async function Articles({ searchParams }: IProps) {
  const page = typeof searchParams.page === "string" ? +searchParams.page : 1;
  const search = searchParams.search || "";
  const filter = searchParams.filter || ArticleFilterEnum.ALL;
  const categoryId =
    searchParams.category && !isNaN(+searchParams.category)
      ? searchParams.category
      : "0";

  const [articlesResponse, categories] = await Promise.all([
    getFilteredArticlesWithCountAction({
      page,
      pageSize,
      search,
      filter,
      categoryId,
    }),
    getCategoriesAction(),
  ]);

  const [articles, articlesCount] = articlesResponse;

  const totalPages = Math.ceil(articlesCount / pageSize);

  if (totalPages < page && totalPages !== 0) {
    return redirect("/dashboard/articles?page=" + totalPages);
  }

  return (
    <PageContainer full>
      <ArticleQueriesHeader search={search} categories={categories} />
      <div className="pt-2 md:pt-0">
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
    </PageContainer>
  );
}
