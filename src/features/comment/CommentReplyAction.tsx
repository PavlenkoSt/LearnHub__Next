"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaReplyAll } from "react-icons/fa";
import { useCommentReplyToActive } from "@/src/shared/hooks/useCommentReplyToActive";
import Btn from "@/src/shared/UI/Btn";

interface IProps {
  commentId: number;
  articleId: number;
}

export default function CommentReplyAction({ commentId, articleId }: IProps) {
  const isActive = useCommentReplyToActive(commentId);

  const router = useRouter();

  const onClick = () => {
    router.replace(`/dashboard/articles/${articleId}?replyTo=${commentId}`, {
      scroll: false,
    });
  };

  if (isActive) return null;

  return (
    <Btn onClick={onClick} isIconOnly size="sm" color="primary">
      <FaReplyAll size={20} />
    </Btn>
  );
}
