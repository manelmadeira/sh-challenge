export interface Call {
  id: string;
  timestamp: string;
  agentID: string;
  sentiment: "positive" | "negative" | "neutral";
  duration: number;
  feedbackStatus: string;
}

export type CallsResponse = {
  calls: Call[];
}
