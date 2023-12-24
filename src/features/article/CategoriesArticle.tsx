"use client";

import React, { useMemo } from "react";
import type { ArticleCategory } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import SelectComponent from "@/src/shared/UI/Select";

interface IProps {
  categories: ArticleCategory[];
}

export default function CategoriesArticle({ categories }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const categoryId = category && !isNaN(+category) ? category : "0";

  const options = useMemo(() => {
    return [{ id: 0, name: "All" }, ...categories]
      .map((cat) => ({
        label: cat.name,
        value: cat.id.toString(),
      }))
      .sort((a, b) => {
        const nameA = a.label.toLowerCase();
        const nameB = b.label.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameB < nameA) return 1;
        return 0;
      });
  }, [categories]);

  return (
    <SelectComponent
      label="In category"
      placeholder=" "
      variant="bordered"
      defaultSelectedKeys={categoryId}
      selectedKeys={categoryId}
      className="md:max-w-[14rem]"
      onChange={(e) => {
        const search = new URLSearchParams(searchParams);
        search.set("category", e.target.value);
        search.delete("page");
        router.push(`/dashboard/articles?${search.toString()}`);
      }}
      options={options}
    />
  );
}
