"use client";

import React, { useState } from "react";
import type { Article } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Btn from "@/app/_components/UI/Btn";
import Confirm from "@/app/_components/UI/Confirm";
import { deleteArticleAction } from "@/app/_server-actions/articles";

interface IProps {
  article: Article;
}

export default function Actions({ article }: IProps) {
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="flex items-center justify-center gap-2">
      <Btn isIconOnly onPress={() => router.push(pathname + "/edit")} size="sm">
        <FaEdit size={20} />
      </Btn>
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
    </div>
  );
}
