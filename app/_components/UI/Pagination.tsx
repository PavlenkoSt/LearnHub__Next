"use client";

import { Pagination, PaginationProps } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps extends PaginationProps {}

export default function PaginationComponent(props: IProps) {
  const router = useRouter();

  return (
    <Pagination {...props} onChange={(page) => router.push(`?page=${page}`)} />
  );
}
