import React from "react";
import PageContainer from "@/src/app/_components/PageContainer";
import BreadcrumbsComponent from "@/src/app/_components/UI/Breadcrumbs";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="my-2">
        <BreadcrumbsComponent
          links={[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Articles", href: "/dashboard/articles" },
            {
              name: "Not found",
              href: `/dashboard/articles/not-found`,
            },
          ]}
        />
        <div className="my-10 flex items-center justify-center text-center text-primary">
          Article not found
        </div>
      </div>
    </PageContainer>
  );
}
