import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import PageContainer from "@/app/_components/PageContainer";
import BreadcrumbsComponent from "@/app/_components/UI/Breadcrumbs";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Article({ params }: IProps) {
  const session = await getServerSession();
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
        {isOwner && <div>test</div>}
      </div>
    </PageContainer>
  );
}
