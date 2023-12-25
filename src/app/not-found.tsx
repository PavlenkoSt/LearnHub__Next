import React from "react";
import PageContainer from "@/src/shared/components/PageContainer";
import DashboardCard from "@/src/shared/components/DashboardCard";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="min-h-screen flex-1 overflow-y-auto bg-secondary pb-4 md:pb-0">
        <DashboardCard>
          <div className="flex flex-col items-center justify-center font-bold text-primary">
            <h1 className="mb-2 text-3xl">404</h1>
            <h2 className="text-2xl">Page not found</h2>
          </div>
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
