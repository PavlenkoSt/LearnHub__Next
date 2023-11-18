"use client";

import React, { useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import ModalWrapper from "../_components/UI/ModalWrapper";

export default function HeaderSearch() {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button onClick={() => setVisible(true)} className="header-btn">
        <AiOutlineSearch size={20} />
      </button>
      <ModalWrapper visible={visible} setVisible={setVisible}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="h-[58px] w-full rounded-lg bg-white px-4 pr-[40px] placeholder-[#aeaeae] outline-[#fff]"
          placeholder="Find anything..."
        />
        <div
          onClick={() => inputRef.current?.focus()}
          className="absolute bottom-0 right-0 top-0 flex w-[40px] cursor-text items-center justify-center"
        >
          <AiOutlineSearch size={20} color="#aeaeae" />
        </div>
      </ModalWrapper>
    </>
  );
}
