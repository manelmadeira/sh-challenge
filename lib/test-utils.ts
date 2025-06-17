import { ReactElement, ReactNode } from "react";

import { type RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return children;
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
