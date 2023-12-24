"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputComponent from "@/src/app/_components/UI/Input";
import { debounce } from "@/src/app/_utilts/debounce";

interface IProps {
  search: string;
}

export default function HeaderSearch({ search }: IProps) {
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
