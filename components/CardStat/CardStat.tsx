import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CardStatProps {
  title?: string;
  value?: string;
  diffDirection?: "up" | "down";
  diffValue?: string;
}

export function CardStat({
  title,
  value,
  diffDirection,
  diffValue,
}: CardStatProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          {title ? title : <Skeleton className="h-4 w-1/2" />}
        </CardDescription>
        <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-semibold tabular-nums">
          {value ? value : <Skeleton className="h-8 w-full" />}
        </CardTitle>
        <CardAction>
          {diffDirection && diffValue ? (
            <Badge variant="outline">
              {diffDirection === "up" ? (
                <IconTrendingUp aria-label="Trending up" />
              ) : (
                <IconTrendingDown aria-label="Trending down" />
              )}
              {diffValue}%
            </Badge>
          ) : (
            <Skeleton className="h-4 w-[30px]" />
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
}
