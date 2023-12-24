"use client";

import React, { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { CSSTransition } from "react-transition-group";

interface IProps {
  children: ReactNode;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function ModalWrapper({
  children,
  visible,
  setVisible,
}: IProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={visible}
      timeout={500}
      classNames="modal"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        className="modal-container absolute bottom-0 left-0 right-0 top-0 z-50 flex items-start justify-center overflow-hidden bg-[#07165871] backdrop-blur-sm transition-all "
        onClick={() => setVisible(false)}
        ref={nodeRef}
      >
        <div className="flex h-full w-full items-start justify-center overflow-y-auto">
          <div
            className="modal-window relative mt-20 w-[100%] max-w-[480px] overflow-hidden rounded-lg border-transparent bg-white outline-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
