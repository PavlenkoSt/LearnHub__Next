import Image from "next/image";
import React from "react";

export default function Dashboard() {
  return (
    <div className="m-auto max-w-[1200px]">
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
            <h1 className="mb-5 text-3xl font-medium">
              Welcome to <span className="text-active font-bold">LearnHub</span>
            </h1>
            <h2 className="text-lg">
              Your personalized dashboard awaits, filled with courses,
              resources, and tools to help you reach your full potential. Let's
              make every click count. Happy learning! 📚🚀
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
