interface Metric {
  value: string;
  diffDirection: "up" | "down";
  diffValue: string;
}

export interface SentimentMetricsResponse {
  averageCallDuration: Metric;
  agentLatency: Metric;
  sentimentScore: Metric;
}
