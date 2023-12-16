import type { ArticleComment, User } from "@prisma/client";
import React from "react";
import { twMerge } from "tailwind-merge";
import CommentBody from "./CommentBody";
import CommentReplyMark from "./CommentReplyMark";

interface IProps {
  comment: ArticleComment & { user: User };
  isOwner: boolean;
}

export default function CommentReply({ comment, isOwner }: IProps) {
  return (
    <div
      className={twMerge(
        "flex border-t-[1px] border-t-gray-300 bg-white py-4 pl-2 pr-4 sm:pl-0",
        isOwner && "bg-primary-50",
      )}
    >
      <div className="hidden sm:flex">
        <CommentReplyMark height={30} />
      </div>
      <div className="flex-1">
        <CommentBody comment={comment} isReply />
      </div>
    </div>
  );
}
