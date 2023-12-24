import React from "react";
import { getArticleCommentsAction } from "@/src/entities/actions/articleComments";
import CommentForm from "@/src/features/comment/CommentForm";
import Comment from "./Comment";

interface IProps {
  articleId: number;
}

export default async function Comments({ articleId }: IProps) {
  const comments = await getArticleCommentsAction(articleId);

  return (
    <div className="py-4">
      <h3 className="mb-4 font-bold text-secondary">
        Comments {comments.length}
      </h3>
      <div className="mb-4">
        <CommentForm articleId={articleId} />
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
