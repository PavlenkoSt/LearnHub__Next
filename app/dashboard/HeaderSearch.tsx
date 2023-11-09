"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";

export default function HeaderSearch() {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef(null);

  return (
    <>
      <div
        onClick={() => setSearchModalVisible(true)}
        className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-secondary transition-all hover:bg-white"
      >
        <AiOutlineSearch size={20} />
      </div>
      <CSSTransition
        in={searchModalVisible}
        timeout={600}
        classNames="modal"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <>
          {createPortal(
            <div
              className="modal-container absolute bottom-0 left-0 right-0 top-0 z-50 flex items-start justify-center bg-[#07165871] backdrop-blur-sm transition-all "
              onClick={() => setSearchModalVisible(false)}
              ref={nodeRef}
            >
              <div
                className="modal-window relative mt-20 w-[100%] max-w-[480px] overflow-hidden rounded-lg border-transparent bg-white outline-white"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
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
              </div>
            </div>,
            document.body,
          )}
        </>
      </CSSTransition>
    </>
  );
}
