import React from "react";
import Image from "next/image";
import type { Article } from "@prisma/client";
import { getImageSrc } from "@/app/_utilts/getImageSrc";
import Link from "next/link";
import Btn from "@/app/_components/UI/Btn";

interface IProps {
  article: Article;
}

export default function ArticleCard({ article }: IProps) {
  return (
    <Link href={`/dashboard/articles/${article.id}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-md border-[1px] border-primary bg-[#fff]">
        <div className="flex h-[200px] w-full items-center justify-center overflow-hidden">
          <Image
            src={getImageSrc(article.pictureUrl) || "/placeholder.jpg"}
            width={300}
            height={200}
            alt="Article"
            className="min-h-[200px] min-w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-1 p-3">
          <div>
            <div className="text-xl font-bold text-primary">{article.name}</div>
            <div className="line-clamp-3 overflow-clip text-sm">
              {article.description}
            </div>
          </div>
          <div className="self-end font-medium text-primary transition-all group-hover:text-secondary group-hover:underline">
            Learn more
          </div>
        </div>
      </div>
    </Link>
  );
}
