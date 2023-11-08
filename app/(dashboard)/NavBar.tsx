"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxChevronRight } from "react-icons/rx";

export default function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={twMerge(
        "relative h-screen w-12 bg-primary px-3 py-2 transition-all",
        isCollapsed && "w-44",
      )}
    >
      <div
        onClick={() => setIsCollapsed((prev) => !prev)}
        className={twMerge(
          "border-selected-dark absolute right-[-10px] top-4 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-2 bg-secondary text-primary transition-all",
          isCollapsed && "rotate-180",
        )}
      >
        <RxChevronRight />
      </div>
    </div>
  );
}
