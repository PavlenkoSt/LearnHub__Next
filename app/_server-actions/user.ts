"use server";

import bcrypt from "bcryptjs";
import prisma from "@/prisma";
import { removeImageLocally, saveImageLocally } from "../_utilts/imagesFS";
import { emailRegExp } from "../_utilts/regexps";

export const createUserAction = async (dto: {
  email: string;
  password: string;
}) => {
  const { email, password } = dto;

  if (!email || !emailRegExp.test(email)) {
    throw new Error("Email is not valid");
  }

  if (!password || password.length < 6) {
    throw new Error("Password must contain at least 6 characters");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, passwordHash, firstName: "", lastName: "", image: "" },
    });

    return user;
  } catch (e: any) {
    if (e.code === "P2002") {
      throw new Error("Email already exist in system");
    }
    throw e;
  }
};

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

export const updateUserInfoAction = async ({
  id,
  updateDto,
}: {
  id: number;
  updateDto: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}) => {
  const user = await prisma.user.update({
    data: updateDto,
    where: { id },
  });

  return user;
};
