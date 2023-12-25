import React, { ReactNode } from "react";
import PageLoadingIndicator from "./PageLoaderIndicator";

interface IProps {
  children: ReactNode;
  full?: boolean;
}

export default function PageContainer({ children, full }: IProps) {
  return (
    <div>
      <PageLoadingIndicator />
      {full ? (
        <div className="px-1 sm:px-3">{children}</div>
      ) : (
        <div className="m-auto max-w-[1200px] px-1 sm:px-3">{children}</div>
      )}
    </div>
  );
}
