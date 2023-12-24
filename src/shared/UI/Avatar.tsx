import React from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { MdOutlineModeEdit } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface IProps {
  src: string | StaticImport;
  size: number;
  rounded?: boolean;
}

export default function Avatar({ src, size, rounded }: IProps) {
  const roundedStyle = rounded ? "rounded-full" : "rounded-sm";

  return (
    <div
      className={twMerge(
        "relative mb-1 flex items-center justify-center border-4 border-[#f6f6f6] bg-white",
        roundedStyle,
      )}
      style={{
        width: size + 4,
        height: size + 4,
      }}
    >
      <Image
        src={src}
        width={size}
        height={size}
        className={roundedStyle}
        alt="Avatar"
        style={{
          objectFit: "cover",
          minWidth: "100%",
          minHeight: "100%",
          width: "100%",
          height: "100%",
        }}
      />
      <div
        className={
          "absolute right-1 top-1 rounded-full border-2 border-white bg-primary p-2 text-white"
        }
      >
        <MdOutlineModeEdit size={20} />
      </div>
    </div>
  );
}
