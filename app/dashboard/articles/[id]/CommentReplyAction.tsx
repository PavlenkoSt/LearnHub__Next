"use client";

import React from "react";
import { FaReplyAll } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Btn from "@/app/_components/UI/Btn";
import { useCommentReplyToActive } from "@/app/_hooks/useCommentReplyToActive";

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
