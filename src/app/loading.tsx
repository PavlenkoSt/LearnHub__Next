import React from "react";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-secondary">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-primary">LearnHub</h1>
        <div className="h-[40px] w-[40px] min-w-[40px] transition-all">
          <Image src="/logo.png" width={50} height={50} alt="LearnHub" />
        </div>
      </div>
      <Spinner color="primary" size="lg" />
    </div>
  );
}
