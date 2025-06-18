import { MOCK_CALLS } from "./mock-data";
import { CallsResponse } from "./types";

const MOCK_DATA: CallsResponse = {
  calls: MOCK_CALLS,
};

export async function GET() {
  return Response.json(MOCK_DATA);
}
