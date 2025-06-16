import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return children;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
