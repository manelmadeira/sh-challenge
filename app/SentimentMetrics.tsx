"use client";

import { useQuery } from "@tanstack/react-query";

import { CardStat } from "@/components/CardStat";

import { sentimentMetricsOptions } from "./sentiment-metrics-options";

export function SentimentMetrics() {
  const { data } = useQuery(sentimentMetricsOptions);

  return (
    <div className="flex gap-3">
      <div className="basis-1/3">
        <CardStat
          title="Avg. Call Duration"
          value={data?.averageCallDuration.value ? `${data?.averageCallDuration.value} min` : undefined}
          diffDirection={data?.averageCallDuration.diffDirection}
          diffValue={data?.averageCallDuration.diffValue}
        />
      </div>
      <div className="basis-1/3">
        <CardStat
          title="Agent Latency"
          value={data?.agentLatency.value ? `${data?.agentLatency.value}s` : undefined}
          diffDirection={data?.agentLatency.diffDirection}
          diffValue={data?.agentLatency.diffValue}
        />
      </div>
      <div className="basis-1/3">
        <CardStat
          title="Sentiment Score"
          value={data?.agentLatency.value ? `${data?.agentLatency.value}/10` : undefined}
          diffDirection={data?.agentLatency.diffDirection}
          diffValue={data?.agentLatency.diffValue}
        />
      </div>
    </div>
  );
}
