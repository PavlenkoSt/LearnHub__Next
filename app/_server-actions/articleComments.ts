"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/next-auth.options";
import prisma from "@/prisma";

export const getArticleCommentsAction = async (articleId: number) => {
  return await prisma.articleComment.findMany({
    where: {
      articleId,
    },
    include: {
      user: true,
    },
  });
};

export const createCommentAction = async ({
  comment,
  articleId,
}: {
  comment: string;
  articleId: number;
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
      userId,
    },
  });

  revalidatePath(`/dashboard/articles/${deleted.articleId}`);

  return deleted;
};
