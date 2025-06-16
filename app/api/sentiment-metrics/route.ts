import { SentimentMetricsResponse } from "./types";

const MOCK_DATA: SentimentMetricsResponse = {
  averageCallDuration: {
    value: "2.2",
    diffDirection: "down",
    diffValue: "12",
  },
  agentLatency: {
    value: "1.2",
    diffDirection: "up",
    diffValue: "1",
  },
  sentimentScore: {
    value: "7",
    diffDirection: "down",
    diffValue: "8",
  },
};

export async function GET() {
  return Response.json(MOCK_DATA);
}
