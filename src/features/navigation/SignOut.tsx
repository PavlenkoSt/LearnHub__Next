"use client";

import React, { useState, useTransition } from "react";
import { PiSignOut } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalWrapper from "@/src/shared/UI/ModalWrapper";
import Btn from "@/src/shared/UI/Btn";
import toast from "react-hot-toast";

export default function SignOut() {
  const [visible, setVisible] = useState(false);
  const [loading, startTransition] = useTransition();

  const router = useRouter();
  const session = useSession();

  const onClick = async () => {
    if (loading) return;

    startTransition(async () => {
      try {
        await signOut({
          redirect: false,
        });
        await session.update(null);
        router.replace("/sign-in");
        router.refresh();
      } catch (e: any) {
        toast.error(e?.message || "Something went wrong");
      }
    });
  };

  return (
    <>
      <button onClick={() => setVisible(true)} className="header-btn">
        <PiSignOut size={20} />
      </button>
      <ModalWrapper visible={visible} setVisible={setVisible}>
        <div className="flex flex-col items-center p-3">
          <h2 className="mb-4 text-center text-xl font-medium">
            Leaving so soon?
          </h2>
          <Btn isLoading={loading} onClick={onClick}>
            Sign Out
          </Btn>
        </div>
      </ModalWrapper>
    </>
  );
}
