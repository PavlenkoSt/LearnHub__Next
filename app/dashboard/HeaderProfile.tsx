import React from "react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/next-auth.options";

export default async function HeaderProfile() {
  const session = await getServerSession(authOptions);

  return (
    <Link href="/dashboard/profile" className="header-btn overflow-hidden">
      <Image
        src={
          session?.user?.image ? "/tmp/" + session.user.image : "/avatar.svg"
        }
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
