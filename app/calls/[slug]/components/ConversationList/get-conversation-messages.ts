"use client";

import { queryOptions } from "@tanstack/react-query";

import { CallConversation } from "@/app/api/calls/types";

export const getConversationMessages = (id: string) =>
  queryOptions<CallConversation>({
    queryKey: [`calls/${id}/messages`],
    queryFn: async () => {
      const response = await fetch(`/api/calls/${id}/messages`);

      return response.json();
    },
  });
