import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth.options";
import { getImageSrc } from "@/src/shared/utilts/getImageSrc";
import NextLink from "@/src/shared/UI/NextLink";

export default async function ProfileAvatarNav() {
  const session = await getServerSession(authOptions);

  return (
    <NextLink href="/dashboard/profile" className="header-btn overflow-hidden">
      <Image
        src={getImageSrc(session?.user?.image) || "/Avatar.svg"}
        alt="Avatar"
        width={25}
        height={25}
        style={{
          objectFit: "cover",
          minWidth: "100%",
          minHeight: "100%",
        }}
        className="rounded-full"
      />
    </NextLink>
  );
}
