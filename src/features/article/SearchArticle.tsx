"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InputComponent from "@/src/shared/UI/Input";
import { debounce } from "@/src/shared/utilts/debounce";

interface IProps {
  search: string;
}

export default function SearchArticle({ search }: IProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(search);
  }, [search]);

  const onChange = debounce((value: string) => {
    const search = new URLSearchParams(searchParams);
    search.set("search", value);
    search.delete("page");
    router.push(`/dashboard/articles?${search.toString()}`);
  }, 500);

  return (
    <InputComponent
      value={value}
      onValueChange={(value) => {
        setValue(value);
        onChange(value);
      }}
      variant="bordered"
      className="md:max-w-[14rem]"
      placeholder=" "
      label="Search articles"
      isClearable
      onClear={() => onChange("")}
    />
  );
}
