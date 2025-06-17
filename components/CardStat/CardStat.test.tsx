import { render, screen } from "@/lib/test-utils";

import { CardStat } from "./CardStat";

describe("CardStat", () => {
  it("should render the component", () => {
    render(
      <CardStat
        title="My Card"
        value="1/10"
        diffDirection="up"
        diffValue="10"
      />
    );

    expect(screen.queryByTestId("skeleton")).toBeNull();

    expect(screen.getByText("My Card")).toBeInTheDocument();
    expect(screen.getByText("1/10")).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();
  });

  it("should render the loading state if no values passed", () => {
    render(<CardStat />);

    expect(screen.getAllByTestId("skeleton")).toHaveLength(3);
  });
});
