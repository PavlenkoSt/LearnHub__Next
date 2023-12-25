"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Pagination, PaginationProps } from "@nextui-org/react";

interface IProps extends PaginationProps {}

export default function PaginationComponent(props: IProps) {
  const router = useRouter();

  return (
    <Pagination {...props} onChange={(page) => router.push(`?page=${page}`)} />
  );
}
