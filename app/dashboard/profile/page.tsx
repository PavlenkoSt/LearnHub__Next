import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import Image from "next/image";
import { getServerSession } from "next-auth";
import ProfileAvatar from "./ProfileAvatar";
import PageContainer from "@/app/_components/PageContainer";
import { authOptions } from "@/next-auth.options";

export const dynamic = "force-dynamic";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <PageContainer>
      <div className="-mt-5 flex items-center justify-center">
        <ProfileAvatar>
          <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full border-4 border-[#f6f6f6] bg-white">
            <Image
              src={
                !!session?.user?.image
                  ? "/tmp/" + session.user.image
                  : "/Avatar.svg"
              }
              width={140}
              height={140}
              className="rounded-full"
              alt="Avatar"
              style={{
                objectFit: "cover",
                minWidth: "100%",
                minHeight: "100%",
                width: "100%",
                height: "100%",
              }}
            />
            <div className="absolute right-3 top-0 rounded-full border-2 border-white bg-primary p-2 text-white">
              <MdOutlineModeEdit size={20} />
            </div>
          </div>
        </ProfileAvatar>
      </div>
    </PageContainer>
  );
}
