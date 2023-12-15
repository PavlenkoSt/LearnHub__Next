import React from "react";
import { getArticleCommentsAction } from "@/app/_server-actions/articleComments";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

interface IProps {
  articleId: number;
}

export default async function Comments({ articleId }: IProps) {
  const comments = await getArticleCommentsAction(articleId);

  return (
    <div className="px-2 py-4">
      <h3 className="mb-4 font-bold text-secondary">
        Comments {comments.length}
      </h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <CommentForm articleId={articleId} />
    </div>
  );
}
