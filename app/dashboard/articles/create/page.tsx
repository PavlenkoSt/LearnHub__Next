import React from "react";
import Form from "./Form";

export default function CreateArticle() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="my-4 text-center text-xl font-semibold text-primary">
        Create article
      </h2>
      <Form />
    </div>
  );
}
