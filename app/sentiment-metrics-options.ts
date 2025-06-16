"use client";

import { queryOptions } from '@tanstack/react-query'
import { SentimentMetricsResponse } from '@/app/api/sentiment-metrics/types';

export const sentimentMetricsOptions = queryOptions<SentimentMetricsResponse>({
  queryKey: ['sentiment-metrics'],
  queryFn: async () => {
    const response = await fetch('/api/sentiment-metrics')

    return response.json()
  },
})
