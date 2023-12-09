import React from "react";
import PageContainer from "@/app/_components/PageContainer";
import BreadcrumbsComponent from "@/app/_components/UI/Breadcrumbs";
import ArticleForm from "@/app/_components/ArticleForm";

export default function CreateArticle() {
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
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-6 mt-6 text-center text-xl font-semibold text-primary md:mb-8 md:mt-2">
          Create article
        </h2>
        <ArticleForm />
      </div>
    </PageContainer>
  );
}
