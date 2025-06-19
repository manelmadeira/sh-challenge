import nock from "nock";

import { SentimentTrends } from "@/app/components/SentimentTrends/SentimentTrends";
import { render, screen, waitFor } from "@/lib/test-utils";

import { MOCK_TRENDS } from "./__fixtures__/mocks";

vi.mock("./TrendsChart", () => ({
  TrendsChart: () => <div data-testid="hello-world">Hello</div>,
}));

describe("SentimentTrends", () => {
  it("should render the mocked chart", async () => {
    const query = nock("http://localhost:3000")
      .get("/api/sentiment-trends")
      .reply(200, MOCK_TRENDS);

    render(<SentimentTrends />);

    expect(screen.queryByTestId("hello-world")).toBeNull();

    expect(screen.getByText("Sentiment Trends")).toBeInTheDocument();
    expect(
      screen.getByText("Hourly sentiment trends across all calls")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(query.isDone()).toBe(true);
    });

    expect(screen.getByTestId("hello-world")).toBeInTheDocument();
  });
});
