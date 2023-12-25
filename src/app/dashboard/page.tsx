import React from "react";
import PageContainer from "@/src/shared/components/PageContainer";
import DashboardCard from "@/src/shared/components/DashboardCard";

export default function Dashboard() {
  return (
    <PageContainer>
      <DashboardCard>
        <h1 className="mb-5 text-center text-2xl font-medium sm:text-3xl md:text-left">
          Welcome to <span className="font-bold text-active">LearnHub</span>
        </h1>
        <h2 className="text-center text-lg sm:px-8 md:px-0 md:text-left">
          Your personalized dashboard awaits, filled with resources to help you
          reach your full potential. Let&apos;s make every click count. Happy
          learning! 📚🚀
        </h2>
      </DashboardCard>
    </PageContainer>
  );
}
