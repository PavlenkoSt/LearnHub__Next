import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-end p-2">
      <Link
        href="/dashboard/articles/create"
        className="flex items-center gap-4 rounded-md bg-primary px-4 py-2 text-white transition-all hover:bg-selected-dark"
      >
        + Create article
      </Link>
    </header>
  );
}
