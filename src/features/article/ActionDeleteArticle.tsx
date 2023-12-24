"use client";

import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import type { Article } from "@prisma/client";
import { deleteArticleAction } from "@/src/entities/actions/articles";
import Confirm from "@/src/shared/UI/Confirm";

interface IProps {
  article: Article;
}

export default function ActionDeleteArticle({ article }: IProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteArticle = async () => {
    try {
      setLoading(true);
      await deleteArticleAction(article.id);
      router.replace("/dashboard/articles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Confirm
      message={`Are your really want delete article "${article.name}"?`}
      onConfirm={deleteArticle}
      btnProps={{
        size: "sm",
        color: "danger",
        isIconOnly: true,
      }}
      loading={loading}
    >
      <MdDelete size={20} />
    </Confirm>
  );
}
