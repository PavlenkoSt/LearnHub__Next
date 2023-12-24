import React from "react";
import type { Article } from "@prisma/client";
import ActionDeleteArticle from "@/src/features/article/ActionDeleteArticle";
import ActionEditArticleNav from "@/src/features/article/ActionEditArticleNav";

interface IProps {
  article: Article;
}

export default function ArticleActions({ article }: IProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <ActionEditArticleNav />
      <ActionDeleteArticle article={article} />
    </div>
  );
}
