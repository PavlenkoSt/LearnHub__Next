"use client";

import React from "react";
import Loader from "./Loader";

interface IProps {
  progress: number;
}

export default function Progress({ progress }: IProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-2 font-bold text-primary">
        <span>{progress}%</span>
        <Loader className="border-primary" />
      </div>
      <div className="h-[14px] w-[300px] overflow-hidden rounded-md border-selected-light bg-slate-300">
        <div
          className="h-[14px] bg-primary transition-all"
          style={{
            width: Math.round((300 * progress) / 100),
          }}
        />
      </div>
    </div>
  );
}
