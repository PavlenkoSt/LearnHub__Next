"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useTransition } from "react";
import Btn from "@/src/shared/UI/Btn";

export default function GoogleSignIn() {
  const [loading, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      await signIn("google");
    });
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="h-[2px] flex-1 rounded-full bg-slate-200" />
        <div>or</div>
        <div className="h-[2px] flex-1 rounded-full bg-slate-200" />
      </div>
      <Btn isLoading={loading} onClick={onClick}>
        <Image src="/google.png" width={30} height={30} alt="Google" />
        Sign in with Google
      </Btn>
    </>
  );
}
