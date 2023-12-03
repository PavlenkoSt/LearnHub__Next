"use client";

import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function TextArea(props: IProps) {
  const { className, label, ...rest } = props;

  return (
    <div className="flex w-full flex-col gap-1">
      {!!label && <div className="">{label}</div>}
      <textarea
        className={twMerge(
          "max-h-[400px] min-h-[100px] w-full max-w-[500px] rounded-md border-[1px] border-selected-dark px-4 py-2 outline-selected-dark transition-all",
          className,
        )}
        {...rest}
      />
    </div>
  );
}
