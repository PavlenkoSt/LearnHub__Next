import type { Article, ArticleCategory } from "@prisma/client";

export type ArticleWithCategory = Article & {
  category: ArticleCategory | null;
};
