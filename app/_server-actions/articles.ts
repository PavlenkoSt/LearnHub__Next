"use server";

import { getServerSession } from "next-auth";
import prisma from "@/prisma";
import { authOptions } from "@/next-auth.options";
import { saveImageLocally } from "../_utilts/imagesFS";

export const createArticleAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
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
      body: "",
      userId: session.user.id,
    },
  });

  return article;
};
