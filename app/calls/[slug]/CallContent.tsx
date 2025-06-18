"use client";

import { useState } from "react";

import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import { CallMessage } from "@/app/api/calls/types";
import { FeedbackStatusBadge } from "@/components/FeedbackStatusBadge";
import { SentimentBadge } from "@/components/SentimentBadge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { ConversationList } from "./ConversationList";
import { MessageFeedback } from "./MessageFeedback";
import { getCallOptions } from "./get-call-options";

export function CallContent({ id }: { id: string }) {
  const { data } = useQuery(getCallOptions(id));
  const [selectedMessage, setSelectedMessage] = useState<
    CallMessage | undefined
  >();

  return (
    <main className="p-4 flex flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {data ? `Call ${data.id}` : <Skeleton className="h-4 w-72" />}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-h-1/2">
        <CardHeader className="border-b">
          <CardTitle>Call details: {data?.id}</CardTitle>
          <CardDescription>
            {data &&
              `${data?.agentID} | ${data?.duration}s |
            ${new Intl.DateTimeFormat("en-US", {
              dateStyle: "short",
              timeStyle: "medium",
            }).format(new Date(data?.timestamp))}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <div className="flex gap-1 grow-0 items-center">
                <span>Sentiment:</span>

                {data?.sentiment && (
                  <SentimentBadge sentiment={data.sentiment} />
                )}
              </div>

              <div className="flex gap-1 items-center">
                <span>Feedback Status:</span>

                {data?.feedbackStatus && (
                  <FeedbackStatusBadge status={data.feedbackStatus} />
                )}
              </div>
            </div>

            <Button variant="outline" size="lg" className="cursor-pointer">
              <IconPlayerPlayFilled /> Play Call
            </Button>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col flex-1/2 gap-2">
              <h3 className="text-lg font-semibold">Conversation</h3>

              <ConversationList
                id={id}
                selectedMessage={selectedMessage}
                onSelected={setSelectedMessage}
              />
            </div>

            <div className="flex flex-col flex-1/2 gap-2">
              <h3 className="text-lg font-semibold">Feedback</h3>

              <MessageFeedback message={selectedMessage} />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
