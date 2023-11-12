import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default async function UnauthWrapper({ children }: IProps) {
  const session = await getServerSession();

  if (session?.user) redirect("/dashboard");

  return <>{children}</>;
}
