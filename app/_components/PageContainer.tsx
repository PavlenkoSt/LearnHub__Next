import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

export default function PageContainer({ children }: IProps) {
  return <div className="m-auto max-w-[1200px]">{children}</div>;
}
