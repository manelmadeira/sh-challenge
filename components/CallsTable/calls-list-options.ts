"use client";

import { queryOptions } from '@tanstack/react-query'

import { CallsResponse } from "@/app/api/calls/types";


export const callsListOptions = queryOptions<CallsResponse>({
  queryKey: ['calls'],
  queryFn: async () => {
    const response = await fetch('/api/calls')

    return response.json()
  },
})
