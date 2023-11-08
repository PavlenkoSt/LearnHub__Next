"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxChevronRight, RxReader } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { BiBrain } from "react-icons/bi";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();

  return (
    <div
      className={twMerge(
        "relative h-screen w-12 bg-primary py-2 transition-all",
        isCollapsed && "w-44",
      )}
    >
      <div
        onClick={() => setIsCollapsed((prev) => !prev)}
        className={twMerge(
          "absolute right-[-10px] top-[18px] z-10 flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-2 border-selected-dark bg-secondary text-primary transition-all",
          isCollapsed && "rotate-180",
        )}
      >
        <RxChevronRight />
      </div>
      <Link
        href="/dashboard"
        className={twMerge(
          "group flex items-center gap-3 overflow-hidden px-3 transition-all",
          !isCollapsed && "translate-y-[7px]",
        )}
      >
        <div
          className={twMerge(
            "h-[40px] w-[40px] min-w-[40px] transition-all",
            !isCollapsed && "h-[25px] w-[25px] min-w-[25px]",
          )}
        >
          <Image src="/logo.png" width={50} height={50} alt="LearnHub" />
        </div>
        <div
          className={twMerge(
            "font-bold text-white opacity-100 transition-all group-hover:underline",
            !isCollapsed && "opacity-0",
          )}
        >
          LearnHub
        </div>
      </Link>

      <div className="mt-10 flex flex-col overflow-hidden">
        <Link
          href="/dashboard/articles"
          className={twMerge(
            "flex items-center gap-2 px-3 py-3 font-medium text-white hover:bg-selected-dark",
            pathname === "/dashboard/articles" && "bg-selected-dark",
          )}
        >
          <div className="h-[25px] w-[25px]">
            <RxReader size="25px" />
          </div>
          <div
            className={twMerge(
              "opacity-0 transition-all",
              isCollapsed && "opacity-100",
            )}
          >
            Articles
          </div>
        </Link>
        <Link
          href="/dashboard/courses"
          className={twMerge(
            "flex items-center gap-2 px-3 py-3 font-medium text-white hover:bg-selected-dark",
            pathname === "/dashboard/courses" && "bg-selected-dark",
          )}
        >
          <div className="h-[25px] w-[25px]">
            <BiBrain size="25px" />
          </div>
          <div
            className={twMerge(
              "opacity-0 transition-all",
              isCollapsed && "opacity-100",
            )}
          >
            Courses
          </div>
        </Link>
      </div>
    </div>
  );
}
