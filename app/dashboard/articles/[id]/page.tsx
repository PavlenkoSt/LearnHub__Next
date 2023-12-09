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
      <div className="my-2 flex items-center justify-between">
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
        <div>
          <div>
            <Image
              width={300}
              height={300}
              alt="Article"
              src={
                article.pictureUrl
                  ? (getImageSrc(article.pictureUrl) as string)
                  : "/placeholder.jpg"
              }
            />
          </div>
          <h1>{article.name}</h1>
          <div>{article.description}</div>
        </div>
      </div>
    </PageContainer>
  );
}
