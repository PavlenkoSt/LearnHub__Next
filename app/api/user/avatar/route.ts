import prisma from "@/prisma";

export async function PATCH(request: Request) {
  const { image, id } = await request.json();

  console.log("image, id", image, id);

  const user = await prisma.user.update({ data: { image }, where: { id } });

  return Response.json({ user }, { status: 200 });
}
