import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import type { ArticleComment, User } from "@prisma/client";
import { authOptions } from "@/next-auth.options";
import Btn from "@/src/shared/UI/Btn";
import { getImageSrc } from "@/src/shared/utilts/getImageSrc";
import { deleteCommentAction } from "@/src/entities/actions/articleComments";
import CommentReplyAction from "./CommentReplyAction";

interface IProps {
  comment: ArticleComment & { user: User };
  isReply?: boolean;
}

export default async function CommentBody({ comment, isReply }: IProps) {
  const session = await getServerSession(authOptions);

  const { user } = comment;

  const isOwner = session?.user.id === user.id;

  const userName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : "Noname";

  const date = dayjs(comment.updatedAt || comment.createdAt).format(
    "DD/MM/YYYY HH:mm:ss",
  );

  const onDelete = async () => {
    "use server";
    await deleteCommentAction(comment.id);
  };

  return (
    <>
      <div className="mb-[5px] flex items-center justify-between gap-2">
        <div className="mb-[5px] flex items-center gap-2">
          <Image
            src={getImageSrc(user.image) || "/Avatar.svg"}
            width={30}
            height={30}
            alt="avatar"
            className="h-[30px] w-[30px] overflow-hidden rounded-full border-[2px] border-gray-400 object-cover"
          />
          <div className="font-medium text-secondary">{userName}</div>
        </div>
        <div className="flex items-center gap-2">
          {!isReply && (
            <CommentReplyAction
              articleId={comment.articleId}
              commentId={comment.id}
            />
          )}
          {isOwner && (
            <form action={onDelete}>
              <Btn type="submit" isIconOnly size="sm" color="danger">
                <MdDelete size={20} />
              </Btn>
            </form>
          )}
        </div>
      </div>
      <div>{comment.body}</div>
      <div className="text-end text-sm text-secondary">
        {comment.updatedAt &&
        dayjs(comment.updatedAt).diff(comment.createdAt) !== 0
          ? `${date} Updated`
          : date}
      </div>
    </>
  );
}
