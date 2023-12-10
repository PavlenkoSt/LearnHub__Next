import React from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import prisma from "@/prisma";
import PageContainer from "@/app/_components/PageContainer";
import BreadcrumbsComponent from "@/app/_components/UI/Breadcrumbs";
import { authOptions } from "@/next-auth.options";
import ArticleForm from "@/app/_components/ArticleForm";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Edit({ params }: IProps) {
  const session = await getServerSession(authOptions);
  const article = isNaN(+params.id)
    ? null
    : await prisma.article.findFirst({ where: { id: +params.id } });
  const isOwner = article?.userId === session?.user.id;

  if (!article || !isOwner) {
    return notFound();
  }

  return (
    <PageContainer>
      <div className="my-2">
        <BreadcrumbsComponent
          links={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Articles", href: "/dashboard/articles" },
            {
              name: article.name,
              href: `/dashboard/articles/${params.id}`,
            },
            {
              name: "Edit",
              href: `/dashboard/articles/${params.id}/edit`,
            },
          ]}
        />
      </div>
      <div className="mb-6 flex flex-col items-center justify-center">
        <h2 className="mb-6 mt-6 text-center text-xl font-semibold text-primary md:mb-8 md:mt-2">
          Update article "{article.name}"
        </h2>
        <ArticleForm article={article} />
      </div>
    </PageContainer>
  );
}
