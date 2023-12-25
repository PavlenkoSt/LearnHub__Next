const routeEventName = (event: string) => `route-change-${event}`;

interface IEventDetail {
  from?: string;
  to?: string;
}

export const dispatchRouteChangeEvent = (
  event: "start" | "completed",
  data?: IEventDetail,
) => {
  window.dispatchEvent(
    new CustomEvent(routeEventName(event), {
      bubbles: false,
      cancelable: true,
      detail: data,
    }),
  );
};

// Register a listener for the route change event
export const registerRouteChangeListener = (
  event: "start" | "completed",
  fn: (data?: IEventDetail) => unknown,
) => {
  //@ts-ignore
  window.addEventListener(
    routeEventName(event),
    (event: CustomEvent<IEventDetail>) => {
      fn(event.detail);
    },
  );
};
