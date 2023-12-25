"use client";

import React, { useTransition } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import type { Article } from "@prisma/client";
import { deleteArticleAction } from "@/src/entities/actions/articles";
import useNextRouter from "@/src/shared/hooks/useNextRouter";
import Confirm from "@/src/shared/UI/Confirm";

interface IProps {
  article: Article;
}

export default function ActionDeleteArticle({ article }: IProps) {
  const router = useNextRouter();
  const [loading, startTransition] = useTransition();

  const deleteArticle = async () => {
    if (loading) return;

    startTransition(async () => {
      try {
        await deleteArticleAction(article.id);
        router.replace("/dashboard/articles");
      } catch (e: any) {
        toast.error(e?.message || "Something went wrong");
      }
    });
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
