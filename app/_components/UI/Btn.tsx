"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Loader from "./Loader";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export default function Btn(props: IProps) {
  const { children, loading, onClick, className, ...rest } = props;

  return (
    <div>
      <button
        onClick={(e) => {
          if (onClick && !loading) {
            onClick(e);
          }
        }}
        className={twMerge(
          "flex items-center gap-4 rounded-md bg-primary px-4 py-2 text-white transition-all hover:bg-selected-dark",
          className,
        )}
        {...rest}
      >
        {loading && <Loader />}
        {children}
      </button>
    </div>
  );
}
