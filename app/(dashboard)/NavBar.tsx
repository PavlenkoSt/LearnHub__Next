"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={twMerge(
        "h-screen w-12 bg-primary px-3 py-2 transition-all",
        isCollapsed && "w-44",
      )}
    >
      <div className="text-white">
        <div onClick={() => setIsCollapsed((prev) => !prev)}>press</div>
      </div>
    </div>
  );
}
