import React from "react";
import type { Article } from "@prisma/client";

interface IProps {
  article: Article;
}

export default function ArticleCard({ article }: IProps) {
  return <div>{article.name}</div>;
}
