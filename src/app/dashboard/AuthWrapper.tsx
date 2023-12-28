import { authOptions } from "@/next-auth.options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default async function AuthWrapper({ children }: IProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/sign-in");

  return <>{children}</>;
}
