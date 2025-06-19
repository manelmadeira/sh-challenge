export interface Call {
  id: string;
  timestamp: string;
  agentID: string;
  sentiment: "positive" | "negative" | "neutral";
  duration: number;
  feedbackStatus: "pending" | "not started" | "completed";
}

export interface CallsResponse {
  calls: Call[];
}

export interface CallMessage {
  id: string;
  owner: "agent" | "customer";
  text: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
  rating?: "1" | "2" | "3" | "4" | "5";
  tag?: "inaccurate sentiment" | "critical issue" | "follow-up needed";
  feedback?: string;
}

export interface CallConversation {
  messages: CallMessage[];
}

export interface CallMessageFeedback {
  rating?: "1" | "2" | "3" | "4" | "5";
  tag?: "inaccurate sentiment" | "critical issue" | "follow-up needed";
  feedback?: string;
}
