import bcrypt from "bcryptjs";
import prisma from "@/prisma";
import { emailRegExp } from "@/app/_utilts/regexps";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email)
    return Response.json({ message: "No email provided" }, { status: 400 });

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user)
    return Response.json({ message: "User not found" }, { status: 404 });

  return Response.json({ user }, { status: 200 });
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !emailRegExp.test(email)) {
    return Response.json({ message: "Email is not valid" }, { status: 400 });
  }

  if (!password || password.length < 6) {
    return Response.json(
      { message: "Password must contain at least 6 characters" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, passwordHash, firstName: "", lastName: "" },
    });

    return Response.json({ user }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") {
      return Response.json(
        { message: "Email already exist in system" },
        { status: 400 },
      );
    }
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
