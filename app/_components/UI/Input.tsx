"use client";

import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input(props: IProps) {
  const { className, label, ...rest } = props;

  return (
    <div className="flex flex-col gap-1">
      {!!label && <div className="">{label}</div>}
      <input
        className={twMerge(
          "w-full max-w-[300px] rounded-md border-[1px] border-selected-dark px-4 py-2 outline-selected-dark transition-all",
          className,
        )}
        {...rest}
      />
    </div>
  );
}
