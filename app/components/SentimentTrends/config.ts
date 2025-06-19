import { type ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  sentiment: {
    label: "Sentiment",
  },
  positive: {
    label: "Positive",
    color: "var(--chart-2)",
  },
  negative: {
    label: "Negative",
    color: "var(--chart-1)",
  },
  neutral: {
    label: "Neutral",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;
