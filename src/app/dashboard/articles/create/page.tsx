import React from "react";
import { Metadata } from "next";
import PageContainer from "@/src/shared/components/PageContainer";
import BreadcrumbsComponent from "@/src/shared/UI/Breadcrumbs";
import { getCategoriesAction } from "@/src/entities/actions/categories";
import CreateArticle from "@/src/widgets/article/CreateArticle";

export const metadata: Metadata = {
  title: "Create article",
};

export default async function CreateArticlePage() {
  const categories = await getCategoriesAction();

  return (
    <PageContainer>
      <div className="mt-2">
        <BreadcrumbsComponent
          links={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Articles", href: "/dashboard/articles" },
            { name: "Create", href: "/dashboard/articles/create" },
          ]}
        />
      </div>
      <CreateArticle categories={categories} />
    </PageContainer>
  );
}
