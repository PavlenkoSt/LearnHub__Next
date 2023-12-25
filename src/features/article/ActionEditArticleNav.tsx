"use client";

import React from "react";
import { FaEdit } from "react-icons/fa";
import Btn from "@/src/shared/UI/Btn";
import useNextRouter from "@/src/shared/hooks/useNextRouter";

interface IProps {
  articleId: number;
}

export default function ActionEditArticleNav({ articleId }: IProps) {
  const router = useNextRouter();

  return (
    <Btn
      isIconOnly
      onPress={() => router.push(`/dashboard/articles/${articleId}/edit`)}
      size="sm"
    >
      <FaEdit size={20} />
    </Btn>
  );
}
