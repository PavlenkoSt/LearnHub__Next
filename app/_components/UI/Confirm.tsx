"use client";

import React, { ReactNode, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Btn, { IBtnProps } from "./Btn";

interface IProps {
  children: ReactNode;
  message: string;
  onConfirm: () => Promise<void> | void;
  btnProps?: IBtnProps;
  loading?: boolean;
}

export default function Confirm({
  children,
  message,
  onConfirm,
  btnProps,
  loading,
}: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Btn {...btnProps} onClick={() => setOpen(true)}>
        {children}
      </Btn>
      <ModalWrapper visible={open} setVisible={setOpen}>
        <div className="flex flex-col items-center p-4">
          <div className="mb-4 max-w-[300px] text-center">{message}</div>
          <div className="flex flex-row items-center gap-1">
            <Btn
              onClick={async () => {
                await onConfirm();
                setOpen(false);
              }}
              color="danger"
              isLoading={loading}
            >
              Yes
            </Btn>
            <Btn onClick={() => setOpen(false)}>Cancel</Btn>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
}
