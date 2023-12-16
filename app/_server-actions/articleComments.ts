"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/next-auth.options";
import prisma from "@/prisma";

export const getArticleCommentsAction = async (articleId: number) => {
  return await prisma.articleComment.findMany({
    where: {
      articleId,
      repliedToId: null,
    },
    include: {
      user: true,
      replies: {
        orderBy: {
          id: "desc",
        },
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export const createCommentAction = async ({
  comment,
  articleId,
  repliedToId,
}: {
  comment: string;
  articleId: number;
  repliedToId?: number;
}) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) throw new Error("You are unauthorized");
  if (!comment) throw new Error("Comment is required");
  if (!articleId) throw new Error("Article not found");

  const result = await prisma.articleComment.create({
    data: {
      body: comment,
      userId,
      articleId: +articleId,
      repliedToId,
    },
  });

  revalidatePath(`/dashboard/articles/${articleId}`);

  return result;
};

export const deleteCommentAction = async (id: number) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) throw new Error("You are unauthorized");

  const deleted = await prisma.articleComment.delete({
    where: {
      id,
      OR: [
        {
          userId,
        },
        {
          repliedToId: id,
        },
      ],
    },
  });

  revalidatePath(`/dashboard/articles/${deleted.articleId}`);

  return deleted;
};
