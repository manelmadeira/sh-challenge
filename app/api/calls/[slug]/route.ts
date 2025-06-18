import { MOCK_CALLS } from "../mock-data";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const call = MOCK_CALLS.find((call) => call.id === slug);

  if (call) {
    return Response.json(call);
  }

  return new Response(`No call found with ID ${slug}`, {
    status: 404,
  });
}
