import React from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
}

export default function Loader({ className }: IProps) {
  return (
    <div
      className={twMerge(
        "group-hover:border-primary h-6 w-6 animate-spin rounded-full border-t-4 border-white",
        className,
      )}
    />
  );
}
