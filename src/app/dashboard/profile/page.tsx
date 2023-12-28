import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import { authOptions } from "@/next-auth.options";
import PageContainer from "@/src/shared/components/PageContainer";
import UserFields from "@/src/widgets/user/UserFields";
import UserAvatar from "@/src/widgets/user/UserAvatar";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return {
    title:
      user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : "Profile",
  };
}

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <PageContainer>
      <div>
        <UserAvatar user={user} />
        <UserFields user={user} />
      </div>
      <Toaster />
    </PageContainer>
  );
}
