import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import { authOptions } from "@/next-auth.options";
import PageContainer from "@/app/_components/PageContainer";
import BreadcrumbsComponent from "@/app/_components/UI/Breadcrumbs";
import { getImageSrc } from "@/app/_utilts/getImageSrc";
import Actions from "./Actions";
import ArticleBody from "./ArticleBody";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Article({ params }: IProps) {
  const session = await getServerSession(authOptions);
  const article = isNaN(+params.id)
    ? null
    : await prisma.article.findFirst({ where: { id: +params.id } });
  const isOwner = article?.userId === session?.user.id;

  if (!article) {
    return notFound();
  }

  return (
    <PageContainer>
      <div className="my-2 flex items-center justify-end md:justify-between">
        <BreadcrumbsComponent
          links={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Articles", href: "/dashboard/articles" },
            {
              name: article.name,
              href: `/dashboard/articles/${params.id}`,
            },
          ]}
        />
        {isOwner && <Actions article={article} />}
      </div>
      <div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="w-full md:w-[300px]">
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
            <h1 className="text-3xl font-bold text-primary">{article.name}</h1>
            <h2 className="text-secondary">{article.description}</h2>
          </div>
        </div>
        {!article.body ? (
          <div className="my-4 text-center text-secondary">Empty body</div>
        ) : (
          <ArticleBody body={article.body} />
        )}
      </div>
    </PageContainer>
  );
}
