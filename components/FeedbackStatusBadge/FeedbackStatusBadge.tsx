import { FeedbackStatus } from "@/components/types";
import { Badge } from "@/components/ui/badge";

const FEEDBACK_STATUS_BADGE_BG: Record<FeedbackStatus, string> = {
  "not started": "bg-gray-500 dark:bg-gray-700",
  completed: "bg-[var(--chart-2)]",
  pending: "bg-blue-500 dark:bg-blue-800",
};

interface FeedbackStatusBadgeProps {
  status: FeedbackStatus;
}

export function FeedbackStatusBadge({ status }: FeedbackStatusBadgeProps) {
  return (
    <Badge
      variant="default"
      className={`${FEEDBACK_STATUS_BADGE_BG[status]} dark:text-foreground capitalize w-24`}
    >
      {status}
    </Badge>
  );
}
