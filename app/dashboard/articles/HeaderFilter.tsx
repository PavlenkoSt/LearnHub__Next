"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import SelectComponent from "@/app/_components/UI/Select";
import { ArticleFilterEnum } from "./types";

export default function HeaderFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filter = searchParams.get("filter") || ArticleFilterEnum.ALL;

  const filterOptions = [
    { value: ArticleFilterEnum.ALL, label: "All" },
    { value: ArticleFilterEnum.ONLY_MINE, label: "Only mine" },
    { value: ArticleFilterEnum.ONLY_OTHERS, label: "Only others" },
  ];

  return (
    <SelectComponent
      label="Show artices"
      placeholder=" "
      color="primary"
      variant="bordered"
      options={filterOptions}
      className="md:max-w-[14rem]"
      selectedKeys={filter}
      onChange={(e) => {
        const search = new URLSearchParams(searchParams);
        search.set("filter", e.target.value);
        search.delete("page");
        router.push(`/dashboard/articles?${search.toString()}`);
      }}
    />
  );
}
