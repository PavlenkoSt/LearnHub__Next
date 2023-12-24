import React from "react";
import type { ArticleCategory } from "@prisma/client";
import ArticleForm from "@/src/features/article/ArticleForm";

interface IProps {
  categories: ArticleCategory[];
}

export default function CreateArticle({ categories }: IProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-6 mt-6 text-center text-xl font-semibold text-primary md:mb-8 md:mt-2">
        Create article
      </h2>
      <ArticleForm categories={categories} />
    </div>
  );
}
