import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@/prisma";
import Header from "./Header";
import ArticleCard from "./ArticleCard";
import Pagination from "@/app/_components/UI/Pagination";
import { redirect } from "next/navigation";

interface ISearchParams {
  page?: string;
  search?: string;
}

interface IProps {
  searchParams: ISearchParams;
}

const pageSize = 12;

export const dynamic = "force-dynamic";

export default async function Articles({ searchParams }: IProps) {
  const session = await getServerSession();

  const page = typeof searchParams.page === "string" ? +searchParams.page : 1;
  const search = searchParams.search || "";

  const [articles, articlesCount] = await prisma.$transaction([
    prisma.article.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        id: "desc",
      },
      include: {
        owner: true,
      },
      where: {
        OR: [
          {
            name: {
              mode: "insensitive",
              contains: search,
            },
          },
          {
            description: {
              mode: "insensitive",
              contains: search,
            },
          },
          {
            owner: {
              OR: [
                {
                  firstName: {
                    mode: "insensitive",
                    contains: search,
                  },
                },
                {
                  lastName: {
                    mode: "insensitive",
                    contains: search,
                  },
                },
              ],
            },
          },
        ],
      },
    }),
    prisma.article.count(),
  ]);

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
