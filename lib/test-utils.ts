import { ReactElement, ReactNode } from "react";

import { type RenderOptions, render } from "@testing-library/react";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return children;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
// eslint-disable-next-line import/export -- overriding render
export * from "@testing-library/react";

// eslint-disable-next-line import/export -- overriding render
export { customRender as render };
