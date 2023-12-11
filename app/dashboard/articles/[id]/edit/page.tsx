import React from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { getArticleByIdAction } from "@/app/_server-actions/articles";
import PageContainer from "@/app/_components/PageContainer";
import BreadcrumbsComponent from "@/app/_components/UI/Breadcrumbs";
import { authOptions } from "@/next-auth.options";
import ArticleForm from "@/app/_components/ArticleForm";
import { getCategoriesAction } from "@/app/_server-actions/categories";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Edit({ params }: IProps) {
  const session = await getServerSession(authOptions);

  const [article, categories] = await Promise.all([
    isNaN(+params.id) ? null : getArticleByIdAction(+params.id),
    getCategoriesAction(),
  ]);

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
          Update article &ldquo;{article.name}&ldquo;
        </h2>
        <ArticleForm article={article} categories={categories} />
      </div>
    </PageContainer>
  );
}
