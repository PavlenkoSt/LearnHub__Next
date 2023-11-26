import prisma from "@/prisma";

interface IPersonalInfoDto {
  firstName?: string;
  lastName?: string;
  email?: string;
}

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
    const { firstName, lastName, email } = await request.json();

    const updateDto: IPersonalInfoDto = {};

    if (firstName) updateDto.firstName = firstName;
    if (lastName) updateDto.lastName = lastName;
    if (email) updateDto.email = email;

    const user = await prisma.user.update({
      data: updateDto,
      where: { id },
    });

    return Response.json({ user }, { status: 200 });
  } catch (e) {
    console.log("e", e);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
