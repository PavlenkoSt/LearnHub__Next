import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { MdOutlineModeEdit } from "react-icons/md";

interface IProps {
  src: string | StaticImport;
  size: number;
}

export default function Avatar({ src, size }: IProps) {
  return (
    <div className="relative mb-1 flex h-[150px] w-[150px] items-center justify-center rounded-full border-4 border-[#f6f6f6] bg-white">
      <Image
        src={src}
        width={size}
        height={size}
        className="rounded-full"
        alt="Avatar"
        style={{
          objectFit: "cover",
          minWidth: "100%",
          minHeight: "100%",
          width: "100%",
          height: "100%",
        }}
      />
      <div className="absolute right-3 top-0 rounded-full border-2 border-white bg-primary p-2 text-white">
        <MdOutlineModeEdit size={20} />
      </div>
    </div>
  );
}
