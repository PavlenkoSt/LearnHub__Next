import React from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/next-auth.options";
import PageContainer from "@/src/shared/components/PageContainer";
import BreadcrumbsComponent from "@/src/shared/UI/Breadcrumbs";
import { getCategoriesAction } from "@/src/entities/actions/categories";
import { getArticleByIdAction } from "@/src/entities/actions/articles";
import UpdateArticle from "@/src/widgets/article/UpdateArticle";

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
      <UpdateArticle article={article} categories={categories} />
    </PageContainer>
  );
}
