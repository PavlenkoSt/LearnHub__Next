import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { dispatchRouteChangeEvent } from "@/src/shared/utilts/routeEvents";

export default function useNextRouter() {
  const router = useRouter();

  const proxiesRouter = useMemo(() => {
    const routerProxy = new Proxy(router, {
      get: (target, prop: keyof AppRouterInstance) => {
        if (prop === "push" || prop === "back" || prop === "replace") {
          return (...args: unknown[]) => {
            dispatchRouteChangeEvent("start");

            //@ts-ignore
            return target[prop](...args);
          };
        }

        return target[prop];
      },
    });

    return routerProxy;
  }, [router]);

  return proxiesRouter;
}
