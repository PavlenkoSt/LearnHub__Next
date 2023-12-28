import React from "react";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import { authOptions } from "@/next-auth.options";
import PageContainer from "@/src/shared/components/PageContainer";
import UserFields from "@/src/widgets/user/UserFields";
import UserAvatar from "@/src/widgets/user/UserAvatar";

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
