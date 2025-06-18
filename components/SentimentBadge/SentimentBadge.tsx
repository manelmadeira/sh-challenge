import { Sentiment } from "@/components/types";
import { Badge } from "@/components/ui/badge";

const SENTIMENT_BADGE_BG: Record<Sentiment, string> = {
  positive: "bg-[var(--chart-2)]",
  negative: "bg-[var(--chart-1)]",
  neutral: "bg-[var(--chart-3)]",
};

interface SentimentBadgeProps {
  sentiment: Sentiment;
}

export function SentimentBadge({ sentiment }: SentimentBadgeProps) {
  return (
    <Badge
      variant="default"
      className={`${SENTIMENT_BADGE_BG[sentiment]} capitalize w-16`}
    >
      {sentiment}
    </Badge>
  );
}
