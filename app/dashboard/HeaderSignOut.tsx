"use client";

import React, { useState } from "react";
import { PiSignOut } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ModalWrapper from "../_components/UI/ModalWrapper";
import Btn from "../_components/UI/Btn";

export default function HeaderSignOut() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    try {
      setLoading(true);
      await signOut({
        redirect: false,
      });
      router.replace("/sign-in");
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-secondary transition-all hover:bg-white"
      >
        <PiSignOut size={20} />
      </button>
      <ModalWrapper visible={visible} setVisible={setVisible}>
        <div className="flex flex-col items-center p-3">
          <h2 className="mb-4 text-center text-xl font-medium">
            Leaving so soon?
          </h2>
          <Btn loading={loading} onClick={onClick}>
            Sign Out
          </Btn>
        </div>
      </ModalWrapper>
    </>
  );
}