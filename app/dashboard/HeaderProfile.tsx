import React from "react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/next-auth.options";
import { getImageSrc } from "../_utilts/getImageSrc";

export default async function HeaderProfile() {
  const session = await getServerSession(authOptions);

  return (
    <Link href="/dashboard/profile" className="header-btn overflow-hidden">
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
    </Link>
  );
}
