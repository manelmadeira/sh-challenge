import { CallsResponse } from "@/app/api/calls/types";

export const MOCK_CALLS: CallsResponse = {
  calls: [
    {
      id: "a9971671-4dcd-4af6-b7d1-22fc11f3b4b4",
      timestamp: "2013-05-08T15:58:30Z",
      agentID: "AGT-76",
      sentiment: "neutral",
      duration: 391,
      feedbackStatus: "not started",
    },
    {
      id: "5bac8bf2-9628-42e9-bcee-5204e476a9ac",
      timestamp: "2015-04-11T12:39:36Z",
      agentID: "AGT-65",
      sentiment: "negative",
      duration: 338,
      feedbackStatus: "not started",
    },
  ],
};
