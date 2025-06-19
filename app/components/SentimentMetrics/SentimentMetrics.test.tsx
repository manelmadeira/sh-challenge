import nock from "nock";

import { render, screen, within } from "@/lib/test-utils";

import { SentimentMetrics } from "./SentimentMetrics";
import { MOCK_DATA } from "./__fixtures__/mocks";

describe("SentimentMetrics", () => {
  it("should render component", async () => {
    nock("http://localhost:3000")
      .get("/api/sentiment-metrics")
      .reply(200, MOCK_DATA);

    render(<SentimentMetrics />);

    const avgCallDuration = screen.getByTestId("avg-call-duration");
    expect(
      within(avgCallDuration).getByText("Avg. Call Duration")
    ).toBeInTheDocument();
    await within(avgCallDuration).findByText("2.2 min");

    const agentLatency = screen.getByTestId("agent-latency");
    expect(
      within(agentLatency).getByText("Agent Latency")
    ).toBeInTheDocument();
    await within(agentLatency).findByText("1.2s");
    
    const sentimentScore = screen.getByTestId("sentiment-score");
    expect(
      within(sentimentScore).getByText("Sentiment Score")
    ).toBeInTheDocument();
    await within(sentimentScore).findByText("7/10");
  });
});
