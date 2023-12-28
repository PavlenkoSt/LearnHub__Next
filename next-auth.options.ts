import bcrypt from "bcryptjs";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserProvider } from "@prisma/client";
import prisma from "@/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
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
              provider: UserProvider.CREDENTIALS,
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
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const exist = await prisma.user.findFirst({
          where: {
            email: user.email,
            provider: UserProvider.GOOGLE,
          },
        });

        if (exist) return true;

        await prisma.user.create({
          data: {
            email: user.email,
            provider: UserProvider.GOOGLE,
            passwordHash: "",
          },
        });
      }

      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session.data.user) {
          token.user = session.data.user;
        } else {
          token.user = session.user;
        }
      } else if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (!token) return session;

      const user = token.user as any;

      if ((token.user as any)?.provider === UserProvider.CREDENTIALS) {
        session.user = user;
      } else {
        const userInDB = await prisma.user.findFirst({
          where: {
            email: user.email,
            provider: UserProvider.GOOGLE,
          },
        });

        const sessionToUpdate = {
          email: userInDB?.email || user?.email,
          id: userInDB?.id || user?.id,
          image: userInDB?.image || user?.image,
          firstName: userInDB?.firstName || user?.firstName,
          lastName: userInDB?.lastName || user?.lastName,
        };

        if (user.name) {
          const [firstName, lastName] = user.name?.split(" ");
          if (firstName && !sessionToUpdate.firstName) {
            sessionToUpdate.firstName = firstName;
          }
          if (lastName && !sessionToUpdate.lastName) {
            sessionToUpdate.lastName = lastName;
          }
        }

        session.user = sessionToUpdate;
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
