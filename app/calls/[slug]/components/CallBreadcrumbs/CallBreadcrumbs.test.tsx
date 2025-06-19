import { render, screen } from "@/lib/test-utils";

import { CallBreadcrumbs } from "./CallBreadcrumbs";

describe("CallBreadcrumbs", () => {
  it("should render the skeleton if no ID passed as prop", () => {
    render(<CallBreadcrumbs />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should render the full breadcrumb if an ID is passed as prop", () => {
    render(<CallBreadcrumbs id="random" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");

    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();

    expect(screen.getByText("Call random")).toBeInTheDocument();
  });
});
