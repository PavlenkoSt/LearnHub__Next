import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import Image from "next/image";
import { getServerSession } from "next-auth";
import PageContainer from "@/app/_components/PageContainer";
import { authOptions } from "@/next-auth.options";
import { Toaster } from "react-hot-toast";
import ProfileAvatar from "./ProfileAvatar";
import ProfileField from "./ProfileField";
import { ActiveFormEnum } from "./types";

export const dynamic = "force-dynamic";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <PageContainer>
      <div>
        <div className="  flex items-center justify-center md:-mt-5">
          <ProfileAvatar>
            <div className="relative mb-1 flex h-[150px] w-[150px] items-center justify-center rounded-full border-4 border-[#f6f6f6] bg-white">
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
        <div className="text-primary">
          {!!user?.firstName && !!user?.lastName && (
            <div className="text-center text-2xl font-bold">
              {user.firstName} {user.lastName}
            </div>
          )}
          <div className="my-2 flex items-center justify-center">
            <div className="w-full max-w-[600px]">
              <h2 className="mb-3 text-center text-xl font-medium">
                Personal Information
              </h2>
              <div className="rounded-sm border-[1px] border-primary">
                <ProfileField
                  label="First name"
                  fieldName="firstName"
                  setFieldLabel="Set first name"
                  fieldValue={user?.firstName || ""}
                  formName={ActiveFormEnum.FirstName}
                />
                <ProfileField
                  label="Last name"
                  fieldName="lastName"
                  setFieldLabel="Set last name"
                  fieldValue={user?.lastName || ""}
                  formName={ActiveFormEnum.LastName}
                />
                <ProfileField
                  label="Email"
                  fieldName="email"
                  setFieldLabel="Set email"
                  fieldValue={user?.email || ""}
                  formName={ActiveFormEnum.Email}
                  isEmail
                  isLast
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </PageContainer>
  );
}
