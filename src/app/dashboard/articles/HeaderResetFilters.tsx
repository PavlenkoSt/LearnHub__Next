"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Btn from "@/src/app/_components/UI/Btn";

export default function HeaderResetFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hide =
    (!searchParams.has("category") || searchParams.get("category") === "0") &&
    (!searchParams.has("filter") || searchParams.get("filter") === "0") &&
    (!searchParams.has("search") || searchParams.get("search") === "");

  if (hide) return null;

  return (
    <Btn
      onClick={() => {
        router.push("/dashboard/articles");
      }}
      variant="bordered"
      color="default"
      className="min-w-[100px] p-2"
    >
      Reset filters
    </Btn>
  );
}
