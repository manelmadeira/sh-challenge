"use client";

import { useQuery } from "@tanstack/react-query";

import { CardStat } from "@/components/CardStat";

import { sentimentMetricsOptions } from "./sentiment-metrics-options";

export function SentimentMetrics() {
  const { data } = useQuery(sentimentMetricsOptions);

  return (
    <div className="flex gap-3 flex-col md:flex-row">
      <div className="basis-1/3" data-testid="avg-call-duration">
        <CardStat
          title="Avg. Call Duration"
          value={
            data?.averageCallDuration.value
              ? `${data?.averageCallDuration.value} min`
              : undefined
          }
          diffDirection={data?.averageCallDuration.diffDirection}
          diffValue={data?.averageCallDuration.diffValue}
        />
      </div>
      <div className="basis-1/3" data-testid="agent-latency">
        <CardStat
          title="Agent Latency"
          value={
            data?.agentLatency.value
              ? `${data?.agentLatency.value}s`
              : undefined
          }
          diffDirection={data?.agentLatency.diffDirection}
          diffValue={data?.agentLatency.diffValue}
        />
      </div>
      <div className="basis-1/3" data-testid="sentiment-score">
        <CardStat
          title="Sentiment Score"
          value={
            data?.sentimentScore.value
              ? `${data?.sentimentScore.value}/10`
              : undefined
          }
          diffDirection={data?.sentimentScore.diffDirection}
          diffValue={data?.sentimentScore.diffValue}
        />
      </div>
    </div>
  );
}
