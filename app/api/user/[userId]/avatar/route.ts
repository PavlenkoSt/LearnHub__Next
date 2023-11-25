import prisma from "@/prisma";
import { v4 } from "uuid";
import { writeFile, access, mkdir, constants, unlink } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

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

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const avatarName = v4() + "__" + image.name;
    const folder = join("public", "tmp");
    const path = join(folder, avatarName);

    try {
      await access(folder, constants.F_OK);
    } catch (e) {
      await mkdir(folder);
    }

    await writeFile(path, buffer);

    const prevUser = await prisma.user.findFirst({ where: { id } });

    if (prevUser && prevUser?.image) {
      try {
        const prevImg = join(folder, prevUser.image);
        await access(prevImg);
        await unlink(prevImg);
      } catch (e) {}
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
