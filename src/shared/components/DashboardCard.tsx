import Image from "next/image";
import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function DashboardCard({ children }: IProps) {
  return (
    <div className="md:flex md:items-center md:gap-3">
      <div className="md:flex-1">
        <Image
          src="/dashboard.jpg"
          width={1160}
          height={1280}
          alt="LearnHub dashboard"
          className="md:rounded-3xl"
        />
      </div>
      <div className="text-primary md:flex-1 md:py-4">
        <div className="md:max-w-[500px]">{children}</div>
      </div>
    </div>
  );
}
