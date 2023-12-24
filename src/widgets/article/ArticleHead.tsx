import React from "react";
import Image from "next/image";
import { getImageSrc } from "@/src/shared/utilts/getImageSrc";
import { ArticleWithCategory } from "@/src/entities/types/Article";

interface IProps {
  article: ArticleWithCategory;
}

export default function ArticleHead({ article }: IProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="w-full overflow-hidden rounded-lg md:w-[300px]">
        <Image
          width={1000}
          height={1000}
          alt="Article"
          className="object-cover"
          src={
            article.pictureUrl
              ? (getImageSrc(article.pictureUrl) as string)
              : "/placeholder.jpg"
          }
        />
      </div>
      <div>
        <h1 className="flex items-start gap-1 text-3xl font-bold text-primary">
          {article.name}
          {!!article.category && (
            <span className="rounded-full bg-primary px-2 py-1 text-sm text-white">
              {article.category.name}
            </span>
          )}
        </h1>
        <h2 className="text-secondary">{article.description}</h2>
      </div>
    </div>
  );
}
