"use server";

import prisma from "@/prisma";

export const createCategoryAction = async (name: string) => {
  return await prisma.articleCategory.create({
    data: { name },
  });
};

export const getCategoriesAction = async () => {
  return await prisma.articleCategory.findMany();
};
