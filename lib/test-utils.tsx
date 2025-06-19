import { ReactElement, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const user = userEvent.setup();

  return {
    ...render(ui, { wrapper: AllTheProviders, ...options }),
    user,
  };
};

// re-export everything
// eslint-disable-next-line import/export -- overriding render
export * from "@testing-library/react";

// eslint-disable-next-line import/export -- overriding render
export { customRender as render };
