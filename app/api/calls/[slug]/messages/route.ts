import { CallConversation } from "@/app/api/calls/types";

import { MOCK_MESSAGES } from "./mock-data";

const MOCK_DATA: CallConversation = {
  messages: MOCK_MESSAGES
};

export async function GET() {
  return Response.json(MOCK_DATA);
}
