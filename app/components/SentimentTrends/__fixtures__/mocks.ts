import { SentimentTrendsResponse } from "@/app/api/sentiment-trends/types";

export const MOCK_TRENDS: SentimentTrendsResponse = {
  data: [
    { date: "2025-06-16T18:00:00.000Z", positive: 0.6, negative: 0.2, neutral: 0.2 },
  ]
}
