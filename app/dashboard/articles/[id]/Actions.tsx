"use client";

import React from "react";
import type { Article } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Btn from "@/app/_components/UI/Btn";

interface IProps {
  article: Article;
}

export default function Actions({ article }: IProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-2">
      <Btn onPress={() => router.push(pathname + "/edit")} size="sm">
        <FaEdit size={20} />
      </Btn>
      {/* Confirm to delete article */}
      <Btn size="sm" color="danger">
        <MdDelete size={20} />
      </Btn>
    </div>
  );
}
