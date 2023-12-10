"use client";

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import ModalWrapper from "../_components/UI/ModalWrapper";

export default function HeaderSearch() {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (visible) {
      setSearchValue("");
    }
  }, [visible]);

  const onSearch = () => {
    setVisible(false);
    router.push("/dashboard/articles?search=" + searchValue);
  };

  return (
    <>
      <button onClick={() => setVisible(true)} className="header-btn">
        <AiOutlineSearch size={20} />
      </button>
      <ModalWrapper visible={visible} setVisible={setVisible}>
        <input
          ref={inputRef}
          value={searchValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          className="h-[58px] w-full rounded-lg bg-white px-4 pr-[40px] placeholder-[#aeaeae] outline-[#fff]"
          placeholder="Find anything..."
        />
        <div
          onClick={() => {
            if (!searchValue) {
              inputRef.current?.focus();
            } else {
              onSearch();
            }
          }}
          className={twMerge(
            "absolute bottom-0 right-0 top-0 z-10 flex w-[40px] cursor-text items-center justify-center transition-all",
            searchValue && "cursor-pointer bg-selected-light",
          )}
        >
          <AiOutlineSearch size={20} color={searchValue ? "#fff" : "#aeaeae"} />
        </div>
      </ModalWrapper>
    </>
  );
}
