import React from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { getServerSession } from "next-auth";
import type { ArticleComment, User } from "@prisma/client";
import { authOptions } from "@/next-auth.options";
import { getImageSrc } from "@/app/_utilts/getImageSrc";
import Btn from "@/app/_components/UI/Btn";
import { deleteCommentAction } from "@/app/_server-actions/articleComments";
import toast from "react-hot-toast";

interface IProps {
  comment: ArticleComment & { user: User };
}

export default async function Comment({ comment }: IProps) {
  const session = await getServerSession(authOptions);

  const { user } = comment;

  const isOwner = session?.user.id === user.id;

  const userName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : "Noname";

  const onDelete = async () => {
    "use server";
    await deleteCommentAction(comment.id);
  };

  return (
    <div className="mb-3 rounded-md border-[1px] border-gray-400 bg-white px-2 py-2 pb-3">
      <div className="mb-[5px] flex items-center justify-between gap-2">
        <div className="mb-[5px] flex items-center gap-2">
          <Image
            src={getImageSrc(user.image) || "/Avatar.svg"}
            width={30}
            height={30}
            alt="avatar"
            className="overflow-hidden rounded-full border-[2px] border-gray-400"
          />
          <div className="font-medium text-secondary">{userName}</div>
        </div>
        <div>
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
    </div>
  );
}
