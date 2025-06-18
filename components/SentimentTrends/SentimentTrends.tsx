"use client";

import { useQuery } from "@tanstack/react-query";

import { TrendsChart } from "@/components/TrendsChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { sentimentTrendsOptions } from "./sentiment-trends-options";

export function SentimentTrends() {
  const { data } = useQuery(sentimentTrendsOptions);

  return (
    <Card className="pt-0 w-full">
      <CardHeader className="flex items-center space-y-0 border-b py-5">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-2xl">Sentiment Trends</CardTitle>
          <CardDescription>
            Hourly sentiment trends across all calls
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {data?.data ? (
          <TrendsChart data={data.data} />
        ) : (
          <Skeleton className="h-[250px] w-full" />
        )}
      </CardContent>
    </Card>
  );
}
