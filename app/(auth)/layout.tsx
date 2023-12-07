import React, { ReactNode } from "react";
import Image from "next/image";
import UnauthWrapper from "./UnauthWrapper";

import bg from "@/public/login.webp";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <UnauthWrapper>
      <div
        className="h-screen w-screen"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex h-screen items-center justify-center bg-[#1f1f1fc4] backdrop-blur-sm">
          <div className="flex w-full flex-col items-center justify-center gap-5 border-[1px] border-selected-dark bg-white bg-gradient-to-b px-2 py-7 md:w-auto md:min-w-[500px] md:rounded-lg md:px-7">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="LearnHub logo"
              />
              <div className="text-xl font-semibold text-primary">LearnHub</div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </UnauthWrapper>
  );
}
