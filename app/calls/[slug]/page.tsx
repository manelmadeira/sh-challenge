import { CallContent } from "@/app/calls/[slug]/CallContent";

export default async function Call({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CallContent id={slug} />;
}
