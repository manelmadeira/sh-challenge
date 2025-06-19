import { useMutation } from "@tanstack/react-query";

import { CallMessage, CallMessageFeedback } from "@/app/api/calls/types";
import { getQueryClient } from "@/app/get-query-client";

export function useUpdateFeedback(
  callId: string,
  onSettled: () => void,
  message?: CallMessage,
) {
  const queryClient = getQueryClient();

  return useMutation<CallMessage, unknown, CallMessageFeedback>({
    mutationFn: async (variables) => {
      const response = await fetch(
        `/api/calls/${callId}/messages/${message?.id}`,
        {
          method: "POST",
          body: JSON.stringify(variables),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      return await response.json();
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [`calls/${callId}/messages`],
      });

      onSettled();
    },
  });
}
