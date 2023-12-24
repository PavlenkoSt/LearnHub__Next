import React from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { authOptions } from "@/next-auth.options";
import BreadcrumbsComponent from "@/src/shared/UI/Breadcrumbs";
import PageContainer from "@/src/shared/components/PageContainer";
import { getArticleByIdAction } from "@/src/entities/actions/articles";
import ArticleActions from "@/src/widgets/article/ArticleActions";
import ArticleBody from "@/src//widgets/article/ArticleBody";
import ArticleHead from "@/src/widgets/article/ArticleHead";
import Comments from "@/src//widgets/comment/Comments";

interface IProps {
  params: {
    id: string;
  };
}

export default async function Article({ params }: IProps) {
  const session = await getServerSession(authOptions);
  const article = isNaN(+params.id)
    ? null
    : await getArticleByIdAction(+params.id);
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
        {isOwner && <ArticleActions article={article} />}
      </div>
      <div>
        <ArticleHead article={article} />
        {!article.body ? (
          <div className="my-4 text-center italic text-secondary">
            Empty body
          </div>
        ) : (
          <ArticleBody body={article.body} />
        )}
        <div className="my-8">
          <Comments articleId={+params.id} />
        </div>
      </div>
      <Toaster />
    </PageContainer>
  );
}
