import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { removeImageLocally, saveImageLocally } from "@/app/_utilts/imagesFS";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  },
) {
  try {
    const id = +params.userId;
    const data = await request.formData();
    const image: File | null = data.get("image") as unknown as File;

    if (!image) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 },
      );
    }

    const avatarName = await saveImageLocally(image);

    const prevUser = await prisma.user.findFirst({ where: { id } });

    if (prevUser && prevUser?.image) {
      removeImageLocally(prevUser.image);
    }

    const user = await prisma.user.update({
      data: { image: avatarName },
      where: { id },
    });

    return Response.json({ user }, { status: 200 });
  } catch (e) {
    console.log("e", e);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
