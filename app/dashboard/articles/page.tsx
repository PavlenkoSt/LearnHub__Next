import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@/prisma";
import Header from "./Header";
import ArticleCard from "./ArticleCard";

export default async function Articles() {
  const session = await getServerSession();
  const articles = await prisma.article.findMany({
    take: 10,
    skip: 0,
  });

  return (
    <div>
      <Header />
      <div>
        {articles.length ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div className="mt-10 text-center text-xl font-semibold text-primary">
            There is no articles yet
          </div>
        )}
      </div>
    </div>
  );
}
