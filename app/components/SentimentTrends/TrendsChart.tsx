import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { SentimentTrendsResponse } from "@/app/api/sentiment-trends/types";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { chartConfig } from "./config";

interface TrendsChartProps {
  data: SentimentTrendsResponse["data"];
}

export function TrendsChart({ data }: TrendsChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <AreaChart data={data}>
        <defs>
          <linearGradient id="fillPositive" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-positive)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-positive)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillNegative" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-negative)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-negative)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillNeutral" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-neutral)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-neutral)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleTimeString("en-US", {
              month: "2-digit",
              day: "numeric",
            });
          }}
        />
        <YAxis unit="%" tickFormatter={(value) => String(value * 100)} />

        <Area
          dataKey="positive"
          type="natural"
          fill="url(#fillPositive)"
          stroke="var(--color-positive)"
          stackId="a"
        />
        <Area
          dataKey="negative"
          type="natural"
          fill="url(#fillNegative)"
          stroke="var(--color-negative)"
          stackId="a"
        />
        <Area
          dataKey="neutral"
          type="natural"
          fill="url(#fillNeutral)"
          stroke="var(--color-neutral)"
          stackId="a"
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              formatter={(value, name) => (
                <>
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                    style={
                      {
                        "--color-bg": `var(--color-${name})`,
                      } as React.CSSProperties
                    }
                  />
                  <div className="text-muted-foreground flex min-w-[130px] items-center text-xs">
                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                      name}
                    <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                      {typeof value === "number" ? `${value * 100}%` : value}
                    </div>
                  </div>
                </>
              )}
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
