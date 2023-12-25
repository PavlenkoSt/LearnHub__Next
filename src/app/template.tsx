"use client";

import { useEffect } from "react";
import { dispatchRouteChangeEvent } from "../shared/utilts/routeEvents";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    dispatchRouteChangeEvent("completed");
  }, []);

  return children;
}
