import React from "react";
import type { ArticleComment, User } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import CommentReplyForm from "./CommentReplyForm";
import CommentReply from "./CommentReply";
import CommentBody from "./CommentBody";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth.options";

type CommentType = ArticleComment & { user: User };

interface IProps {
  comment: CommentType & { replies: CommentType[] };
}

export default async function Comment({ comment }: IProps) {
  const session = await getServerSession(authOptions);

  const isOwner = session?.user.id === comment.userId;

  return (
    <div
      className={twMerge(
        "mb-3 rounded-md border-[1px] border-gray-400 bg-white px-2 py-2 pb-3",
        isOwner && "bg-primary-50",
      )}
    >
      <CommentBody comment={comment} />
      <CommentReplyForm
        commentId={comment.id}
        articleId={comment.articleId}
        isOwner={isOwner}
      />
      {!!comment.replies.length && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <CommentReply
              key={reply.id}
              comment={reply}
              isOwner={session?.user.id === reply.userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
