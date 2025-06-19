import nock from "nock";

import { render, screen, within } from "@/lib/test-utils";

import { CallsTable } from "./CallsTable";
import { MOCK_CALLS } from "./__fixtures__/mocks";

describe("CallsTable", () => {
  it("should render the table", async () => {
    nock("http://localhost:3000").get("/api/calls").reply(200, MOCK_CALLS);

    render(<CallsTable />);

    await screen.findByText("a9971671-4dcd-4af6-b7d1-22fc11f3b4b4");

    expect(
      screen.getAllByRole("columnheader").map((c) => c.textContent)
    ).toEqual([
      "Call ID",
      "Timestamp",
      "Agent ID",
      "Sentiment",
      "Duration (m:s)",
      "Feedback Status",
    ]);

    const firstBodyRow = screen.getAllByRole("row")[1];
    expect(
      within(firstBodyRow)
        .getAllByRole("cell")
        .map((c) => c.textContent)
    ).toEqual([
      "a9971671-4dcd-4af6-b7d1-22fc11f3b4b4",
      "5/8/13, 4:58:30 PM",
      "AGT-76",
      "neutral",
      "6:31",
      "not started",
    ]);

    const firstCell = within(firstBodyRow)
        .getAllByRole("cell")[0]
    expect(within(firstCell).getByRole('link')).toHaveAttribute('href', '/calls/a9971671-4dcd-4af6-b7d1-22fc11f3b4b4')
  });
});
