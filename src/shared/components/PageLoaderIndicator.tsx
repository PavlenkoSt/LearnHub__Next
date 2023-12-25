"use client";

import { useEffect, useState } from "react";
import { Progress } from "@nextui-org/react";
import { registerRouteChangeListener } from "@/src/shared/utilts/routeEvents";

export default function PageLoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    registerRouteChangeListener("start", () => {
      setIsLoading(true);
    });

    registerRouteChangeListener("completed", () => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="h-[4px] overflow-hidden bg-gray-200">
      {isLoading && (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="w-full"
        />
      )}
    </div>
  );
}
