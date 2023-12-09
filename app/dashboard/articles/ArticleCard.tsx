import React from "react";
import Image from "next/image";
import type { Article, User } from "@prisma/client";
import { getImageSrc } from "@/app/_utilts/getImageSrc";
import Link from "next/link";

interface IProps {
  article: Article & { owner: User };
}

export default function ArticleCard({ article }: IProps) {
  const { firstName, lastName } = article.owner;
  const owner = firstName && lastName ? `${firstName} ${lastName}` : "Noname";

  return (
    <Link href={`/dashboard/articles/${article.id}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-md border-[1px] border-primary bg-[#fff]">
        <div className="flex h-[200px] w-full items-center justify-center overflow-hidden">
          <Image
            src={getImageSrc(article.pictureUrl) || "/placeholder.jpg"}
            width={300}
            height={200}
            alt="Article"
            className="min-h-[200px] min-w-full scale-[110%] object-cover transition-all group-hover:scale-[100%]"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-1 p-3">
          <div>
            <div className="text-xl font-bold text-primary">{article.name}</div>
            <div className="line-clamp-3 overflow-clip text-sm">
              {article.description}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm italic">
              by <span>{owner}</span>
            </div>
            <div className="font-medium text-primary transition-all group-hover:text-secondary">
              Learn more
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
