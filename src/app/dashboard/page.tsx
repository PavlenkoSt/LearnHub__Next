import Image from "next/image";
import React from "react";
import PageContainer from "../_components/PageContainer";

export default function Dashboard() {
  return (
    <PageContainer>
      <div className="md:flex md:items-center md:gap-3">
        <div className="md:flex-1">
          <Image
            src="/dashboard.jpg"
            width={1160}
            height={1280}
            alt="LearnHub dashboard"
            className="md:rounded-3xl"
          />
        </div>
        <div className="text-primary md:flex-1 md:py-4">
          <div className="md:max-w-[500px]">
            <h1 className="mb-5 text-center text-2xl font-medium sm:text-3xl md:text-left">
              Welcome to <span className="font-bold text-active">LearnHub</span>
            </h1>
            <h2 className="text-center text-lg sm:px-8 md:px-0 md:text-left">
              Your personalized dashboard awaits, filled with resources to help
              you reach your full potential. Let&apos;s make every click count.
              Happy learning! 📚🚀
            </h2>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
