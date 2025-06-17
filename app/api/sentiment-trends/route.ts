export async function GET() {
  return Response.json({
    data: [
      { date: "2025-06-16T18:00:00.000Z", positive: 0.6, negative: 0.2, neutral: 0.2 },
      { date: "2025-06-16T19:00:00.000Z", positive: 0.4, negative: 0.1, neutral: 0.5 },
      { date: "2025-06-16T20:00:00.000Z", positive: 0.5, negative: 0.3, neutral: 0.2 },
      { date: "2025-06-16T21:00:00.000Z", positive: 0.7, negative: 0.2, neutral: 0.1 },
    ],
  });
}
