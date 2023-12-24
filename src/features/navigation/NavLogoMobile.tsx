import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavLogoMobile() {
  return (
    <Link
      href="/dashboard"
      className="absolute right-[50%] top-[-6px] z-10 flex h-[40px] w-[40px] translate-x-[50%] items-center justify-center rounded-full bg-primary"
    >
      <div className="overflow-hidden rounded-full">
        <Image src="/logo.png" width={30} height={30} alt="LearnHub" />
      </div>
    </Link>
  );
}
