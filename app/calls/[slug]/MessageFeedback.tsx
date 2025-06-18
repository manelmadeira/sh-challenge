"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconMessage } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CallMessage } from "@/app/api/calls/types";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  rating: z.enum(["1", "2", "3", "4", "5"]),
  text: z.string(),
  tag: z.enum(["inaccurate sentiment", "critical issue", "follow-up needed"]),
});

interface MessageFeedbackProps {
  message?: CallMessage;
}

export function MessageFeedback({ message }: MessageFeedbackProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  if (!message) {
    return (
      <div className="flex flex-col gap-3 items-center p-10 border rounded-sm">
        <IconMessage className="size-20 text-gray-800" />

        <p className="text-lg font-semibold">Select a message</p>

        <p className="text-muted-foreground text-sm">
          Click on any message from the conversation to provide feedback
        </p>
      </div>
    );
  }

  // TODO: add form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
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

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="inaccurate sentiment">Inaccurate Sentiment</SelectItem>
                  <SelectItem value="critical issue">Critical Issue</SelectItem>
                  <SelectItem value="follow-up needed">Follow-Up Needed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
