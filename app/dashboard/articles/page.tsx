import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@/prisma";
import Header from "./Header";
import ArticleCard from "./ArticleCard";
import Pagination from "@/app/_components/UI/Pagination";

interface ISearchParams {
  page?: string;
}

interface IProps {
  searchParams: ISearchParams;
}

const pageSize = 12;

export default async function Articles({ searchParams }: IProps) {
  const session = await getServerSession();

  const page = typeof searchParams.page === "string" ? +searchParams.page : 1;

  const [articles, articlesCount] = await prisma.$transaction([
    prisma.article.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        id: "desc",
      },
    }),
    prisma.article.count(),
  ]);

  const totalPages = Math.ceil(articlesCount / pageSize);

  return (
    <div>
      <Header />
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
