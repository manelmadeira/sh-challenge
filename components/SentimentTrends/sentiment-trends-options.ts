"use client";

import { queryOptions } from '@tanstack/react-query'

import { SentimentTrendsResponse } from "@/app/api/sentiment-trends/types";


export const sentimentTrendsOptions = queryOptions<SentimentTrendsResponse>({
  queryKey: ['sentiment-trends'],
  queryFn: async () => {
    const response = await fetch('/api/sentiment-trends')

    return response.json()
  },
})
