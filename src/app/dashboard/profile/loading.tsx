import React from "react";
import { Card, Skeleton } from "@nextui-org/react";
import PageContainer from "@/src/shared/components/PageContainer";

function SkeletonItem() {
  return (
    <div className="flex flex-col items-center gap-1 px-2 md:h-[80px] md:flex-row md:px-6">
      <div className="flex-1">
        <Skeleton className="h-4 w-32 rounded-lg" />
      </div>
      <div className="flex flex-1 items-center gap-2">
        <Skeleton className="h-4 w-32 rounded-lg" />
        <Skeleton className="mb-2 h-[40px] w-[40px] min-w-[40px] rounded-md md:hidden" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <PageContainer>
      <div className="mb-4 flex flex-col items-center justify-center md:-mt-5">
        <Skeleton className="mb-6 h-[140px] w-[140px] rounded-full" />
        <Skeleton className="w-60 rounded-lg">
          <div className="h-6 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>

      <div className="flex items-center justify-center">
        <Card className="w-full max-w-[600px] p-2" radius="lg">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </Card>
      </div>
    </PageContainer>
  );
}
