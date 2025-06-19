"use client";

import { useEffect, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconMessage } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { type CallMessage } from "@/app/api/calls/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateFeedback } from "./use-update-message-feedback";

const formSchema = z.object({
  rating: z.enum(["1", "2", "3", "4", "5"]),
  feedback: z.string(),
  tag: z.enum(["inaccurate sentiment", "critical issue", "follow-up needed"]),
});

interface MessageFeedbackProps {
  callId: string;
  message?: CallMessage;
  onCancel: () => void;
  onSubmit: () => void;
}

export function MessageFeedback({
  callId,
  message,
  onCancel,
  onSubmit,
}: MessageFeedbackProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const updateMessageFeedback = useUpdateFeedback(callId, onSubmit, message);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
      rating: "5",
      tag: "follow-up needed",
    },
  });

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    updateMessageFeedback.mutate(values);
  }

  // update form every time the selected message changes
  useEffect(() => {
    if (message) {
      form.reset({
        feedback: message?.feedback ?? "",
        rating: message?.rating,
        tag: message?.tag,
      });
    }
  }, [message, form]);

  if (!message) {
    return (
      <div className="flex flex-col gap-3 items-center px-10 py-20 border rounded-sm">
        <IconMessage className="size-20 text-gray-800" />

        <p className="text-lg font-semibold">Select a message</p>

        <p className="text-muted-foreground text-sm">
          Click on any message from the conversation to provide feedback
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add message feedback"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1/2">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">1</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="2" />
                        </FormControl>
                        <FormLabel className="font-normal">2</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="3" />
                        </FormControl>
                        <FormLabel className="font-normal">3</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="4" />
                        </FormControl>
                        <FormLabel className="font-normal">4</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="5" />
                        </FormControl>
                        <FormLabel className="font-normal">5</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-1/2">
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="inaccurate sentiment">
                          Inaccurate Sentiment
                        </SelectItem>
                        <SelectItem value="critical issue">
                          Critical Issue
                        </SelectItem>
                        <SelectItem value="follow-up needed">
                          Follow-Up Needed
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>

          <Button
            className="cursor-pointer"
            type="button"
            disabled={updateMessageFeedback.isPending}
            onClick={() => {
              // workaround to make the unit tests work and keep the app working
              formRef.current?.requestSubmit()
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
