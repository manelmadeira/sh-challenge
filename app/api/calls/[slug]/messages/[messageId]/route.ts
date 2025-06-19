import { MOCK_MESSAGES } from "../mock-data";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string; messageId: string }> }
) {
  const { messageId } = await params;
  const res = await request.json();

  const idx = MOCK_MESSAGES.findIndex((message) => message.id === messageId);
  MOCK_MESSAGES[idx] = {
    ...MOCK_MESSAGES[idx],
    ...res,
  };

  return Response.json({ ...MOCK_MESSAGES[idx] });
}
