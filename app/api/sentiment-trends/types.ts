export interface SentimentTrendsResponse {
  data: {
    date: string;
    positive: number;
    negative: number;
    neutral: number;
  }[]
}
