import React from "react";
import Form from "./Form";
import PageContainer from "@/app/_components/PageContainer";

export default function CreateArticle() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center">
        <h2 className="my-8 text-center text-xl font-semibold text-primary">
          Create article
        </h2>
        <Form />
      </div>
    </PageContainer>
  );
}
