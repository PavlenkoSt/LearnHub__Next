"use server";

import { getServerSession } from "next-auth";
import prisma from "@/prisma";
import { authOptions } from "@/next-auth.options";
import { revalidatePath } from "next/cache";
import { removeImageLocally, saveImageLocally } from "../_utilts/imagesFS";

interface IDataToUpdate {
  name: string;
  description: string;
  body: string | undefined;
  pictureUrl?: string;
}

export const createArticleAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const body = formData.get("body")?.toString();
  const picture: File | null = formData.get("picture") as unknown as File;

  const pictureUrl = picture ? await saveImageLocally(picture) : "";

  if (!name || !description)
    throw new Error("Name and description is required");

  const session = await getServerSession(authOptions);

  if (!session?.user.id) throw new Error("User is not found");

  const article = await prisma.article.create({
    data: {
      name,
      description,
      pictureUrl,
      body,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/articles");

  return article;
};

export const updateArticleAction = async (
  formData: FormData,
  articleId: number,
) => {
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const body = formData.get("body")?.toString() || "";
  const picture: File | null = formData.get("picture") as unknown as File;

  const pictureUrl = picture ? await saveImageLocally(picture) : "";

  if (!name || !description)
    throw new Error("Name and description is required");

  const session = await getServerSession(authOptions);

  if (!session?.user.id) throw new Error("User is not found");

  const dataToUpdate: IDataToUpdate = {
    name,
    description,
    body,
  };

  if (pictureUrl) {
    dataToUpdate.pictureUrl = pictureUrl;
  }

  const article = await prisma.article.update({
    data: dataToUpdate,
    where: {
      id: articleId,
      userId: session.user.id,
    },
  });

  revalidatePath("/dashboard/articles");

  return article;
};

export const deleteArticleAction = async (id: number) => {
  const session = await getServerSession(authOptions);

  const targetArticle = await prisma.article.findFirst({ where: { id } });

  if (!targetArticle) throw new Error("Article not found");

  const isOwner = targetArticle.userId === session?.user.id;

  if (!isOwner)
    throw new Error("You cannot delete article that not belongs to you");

  const deleted = await prisma.article.delete({ where: { id } });

  if (!deleted) throw new Error("Not deleted, something went wrong");

  if (deleted.pictureUrl) await removeImageLocally(deleted.pictureUrl);

  revalidatePath("/dashboard/articles");

  return deleted;
};
