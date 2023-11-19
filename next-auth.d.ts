import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number;
      image: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }
}
