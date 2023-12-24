"use client";

import React from "react";
import { FaEdit } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Btn from "@/src/shared/UI/Btn";

export default function ActionEditArticleNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Btn isIconOnly onPress={() => router.push(pathname + "/edit")} size="sm">
      <FaEdit size={20} />
    </Btn>
  );
}
