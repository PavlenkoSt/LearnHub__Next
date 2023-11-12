import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!user) return null;

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash,
          );

          if (!isPasswordValid) return null;

          const { passwordHash: _, ...rest } = user;
          return rest as unknown as User;
        } catch (e) {
          console.log("authorize error", e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
