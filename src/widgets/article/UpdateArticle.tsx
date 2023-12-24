import React from "react";
import type { ArticleCategory } from "@prisma/client";
import { ArticleWithCategory } from "@/src/entities/types/Article";
import ArticleForm from "@/src/features/article/ArticleForm";

interface IProps {
  article: ArticleWithCategory;
  categories: ArticleCategory[];
}

export default function UpdateArticle({ article, categories }: IProps) {
  return (
    <div className="mb-6 flex flex-col items-center justify-center">
      <h2 className="mb-6 mt-6 text-center text-xl font-semibold text-primary md:mb-8 md:mt-2">
        Update article &ldquo;{article.name}&ldquo;
      </h2>
      <ArticleForm article={article} categories={categories} />
    </div>
  );
}
