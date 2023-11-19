import bcrypt from "bcryptjs";
import prisma from "@/prisma";
import { emailRegExp } from "@/app/_utilts/regexps";

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
      data: { email, passwordHash, firstName: "", lastName: "", image: "" },
    });

    return Response.json({ user }, { status: 201 });
  } catch (e: any) {
    if (e.code === "P2002") {
      return Response.json(
        { message: "Email already exist in system" },
        { status: 400 },
      );
    }
    console.log("e", e);

    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
