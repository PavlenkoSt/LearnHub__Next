"use server";

import prisma from "@/prisma";

import { removeImageLocally, saveImageLocally } from "../_utilts/imagesFS";

export const updateUserAvatarAction = async (formData: FormData) => {
  const image = formData.get("image") as File;
  const userId = formData.get("userId") as string;

  if (!image) throw new Error("Please select image");

  const id = +userId;

  const avatarName = await saveImageLocally(image);

  const prevUser = await prisma.user.findFirst({ where: { id } });

  if (prevUser && prevUser?.image) {
    removeImageLocally(prevUser.image);
  }

  const user = await prisma.user.update({
    data: { image: avatarName },
    where: { id },
  });

  return user;
};
