"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { CallMessage } from "@/app/api/calls/types";
import { FeedbackStatusBadge } from "@/components/FeedbackStatusBadge";
import { SentimentBadge } from "@/components/SentimentBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDuration } from "@/lib/format-duration";

import { CallWave } from "./CallWave";
import { PlayCall } from "./PlayCall";
import { CallBreadcrumbs } from "./components/CallBreadcrumbs";
import { ConversationList } from "./components/ConversationList";
import { MessageFeedback } from "./components/MessageFeedback";
import { getCallOptions } from "./get-call-options";
import { useGetAudioCall } from "./use-get-call-audio";

export function CallContent({ id }: { id: string }) {
  const { data } = useQuery(getCallOptions(id));
  const [selectedMessage, setSelectedMessage] = useState<
    CallMessage | undefined
  >();
  const audioSrc = useGetAudioCall();
  const [isAudioReady, setAudioReady] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <main className="p-4 grow flex flex-col gap-6">
      <CallBreadcrumbs id={data?.id} />

      <Card className="grow-1">
        <CardHeader className="border-b">
          <CardTitle>
            {data?.id ? (
              `Call details: ${data.id}`
            ) : (
              <Skeleton className="h-5 w-[400px]" />
            )}
          </CardTitle>
          <CardDescription>
            {data ? (
              `${data.agentID} | ${formatDuration(data.duration)} |
            ${new Intl.DateTimeFormat("en-US", {
              dateStyle: "short",
              timeStyle: "medium",
            }).format(new Date(data.timestamp))}`
            ) : (
              <Skeleton className="h-4 w-[300px]" />
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grow-1 flex flex-col gap-4 relative">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-5 items-center justify-between sm:justify-start">
              <div className="flex gap-1 grow-0 items-center">
                <span>Sentiment:</span>

                {data?.sentiment ? (
                  <SentimentBadge sentiment={data.sentiment} />
                ) : (
                  <Skeleton className="h-6 w-16" />
                )}
              </div>

              <div className="flex gap-1 items-center">
                <span>Feedback Status:</span>

                {data?.feedbackStatus ? (
                  <FeedbackStatusBadge status={data.feedbackStatus} />
                ) : (
                  <Skeleton className="h-6 w-24" />
                )}
              </div>
            </div>

            <PlayCall
              isReady={isAudioReady}
              isPlaying={isAudioPlaying}
              onClick={() => {
                setIsAudioPlaying((prev) => !prev);
              }}
            />
          </div>

          <CallWave
            src={audioSrc}
            isPlaying={isAudioPlaying}
            onReady={() => setAudioReady(true)}
          />

          <div className="grow-1 flex flex-col md:flex-row  gap-5">
            <div className="flex flex-col flex-1/2 order-2 md:order-1 gap-2 ">
              <h3 className="text-lg font-semibold">Conversation</h3>

              <ConversationList
                id={id}
                selectedMessage={selectedMessage}
                onSelected={setSelectedMessage}
              />
            </div>

            <div className="flex flex-col order-1 md:order-2 flex-1/2 gap-2">
              <h3 className="text-lg font-semibold">Feedback</h3>

              <div className="sticky top-[20px]">
                <MessageFeedback
                  callId={id}
                  message={selectedMessage}
                  onCancel={() => setSelectedMessage(undefined)}
                  onSubmit={() => {
                    setSelectedMessage(undefined);

                    toast("✅ Message feedback saved!");
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
