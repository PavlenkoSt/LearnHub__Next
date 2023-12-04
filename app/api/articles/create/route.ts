import prisma from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth.options";
import { saveImageLocally } from "@/app/_utilts/imagesFS";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const name = data.get("name")?.toString().trim();
    const description = data.get("description")?.toString().trim();
    const picture: File | null = data.get("picture") as unknown as File;

    const pictureUrl = picture ? await saveImageLocally(picture) : "";

    if (!name || !description)
      return Response.json(
        { message: "Name and description is required" },
        { status: 400 },
      );

    const session = await getServerSession(authOptions);

    if (!session?.user.id)
      return Response.json({ message: "User is not found" }, { status: 401 });

    const article = await prisma.article.create({
      data: {
        name,
        description,
        pictureUrl,
        body: "",
        userId: session.user.id,
      },
    });

    return Response.json({ article }, { status: 200 });
  } catch (e) {
    console.log("e", e);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
