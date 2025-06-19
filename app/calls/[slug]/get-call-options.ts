"use client";

import { queryOptions } from "@tanstack/react-query";

import { Call } from "@/app/api/calls/types";

export const getCallOptions = (id: string) =>
  queryOptions<Call>({
    queryKey: [`calls/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/calls/${id}`);

      return response.json();
    },
  });
