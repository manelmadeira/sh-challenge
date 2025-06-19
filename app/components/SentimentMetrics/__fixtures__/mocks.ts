import { SentimentMetricsResponse } from "@/app/api/sentiment-metrics/types";

export const MOCK_DATA: SentimentMetricsResponse = {
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
