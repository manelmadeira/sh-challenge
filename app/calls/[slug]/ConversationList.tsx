"use client";

import { IconStarFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import { CallMessage } from "@/app/api/calls/types";
import { SentimentBadge } from "@/components/SentimentBadge";
import { Badge } from "@/components/ui/badge";

import { getConversationMessages } from "./get-conversation-messages";

const MESSAGE_BG = {
  agent:
    "bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-950 dark:hover:border-gray-800 cursor-pointer",
  customer:
    "bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 dark:border-blue-900 cursor-pointer",
};

const SELECTED_MESSAGE = {
  agent:
    "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-800 cursor-pointer",
  customer: "bg-blue-100 dark:bg-blue-900 cursor-pointer",
};

interface ConversationMessageProps {
  message: CallMessage;
  selectedMessage?: CallMessage;
  onSelected: (message: CallMessage | undefined) => void;
}

function ConversationMessage({
  message,
  selectedMessage,
  onSelected,
}: ConversationMessageProps) {
  const isSelected = selectedMessage?.id === message.id;

  return (
    <div
      className={`p-3 border rounded-sm flex flex-col gap-2  
       ${
         isSelected
           ? SELECTED_MESSAGE[message.owner]
           : MESSAGE_BG[message.owner]
       }`}
      onClick={() => {
        onSelected(!isSelected ? message : undefined);
      }}
    >
      <div className="flex justify-between">
        <Badge variant={"outline"} className="capitalize w-24">
          {message.owner}
        </Badge>

        <span className="text-muted-foreground text-sm">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
            timeStyle: "medium",
          }).format(new Date(message.timestamp))}
        </span>
      </div>

      <p>{message.text}</p>

      <div className="flex gap-3 justify-between pt-2">
        <div className="text-muted-foreground text-sm flex gap-1 items-center">
          Sentiment: <SentimentBadge sentiment={message.sentiment} />
        </div>

        <div className="flex gap-3">
          {message.rating && (
            <div className="text-muted-foreground text-sm flex gap-1 items-center">
              Rating: {message.rating}/5 <IconStarFilled className="size-4" />
            </div>
          )}

          {message.tag && (
            <div className="text-muted-foreground text-sm flex gap-1 items-center">
              Tag:{" "}
              <Badge variant="outline" className="capitalize">
                {message.tag}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ConversationListProps {
  id: string;
  selectedMessage?: CallMessage;
  onSelected: (message: CallMessage | undefined) => void;
}

export function ConversationList({
  id,
  selectedMessage,
  onSelected,
}: ConversationListProps) {
  const { data } = useQuery(getConversationMessages(id));

  return (
    <div className="flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
      {data?.messages.map((message) => (
        <ConversationMessage
          key={message.id}
          message={message}
          selectedMessage={selectedMessage}
          onSelected={onSelected}
        />
      ))}
    </div>
  );
}
