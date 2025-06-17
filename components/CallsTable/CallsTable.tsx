"use client";

import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { callsListOptions } from "./calls-list-options";

function TableRowsSkeleton() {
  // no issue of using index as a key because they are
  // getting removed once data has loaded
  return new Array(30).fill(null).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
    </TableRow>
  ));
}

export function CallsTable() {
  const { data, isPending } = useQuery(callsListOptions);

  return (
    <Card className="pt-0 w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5">
        <CardTitle className="text-2xl">Calls History</CardTitle>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Call ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Agent ID</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead className="text-right">Duration (seconds)</TableHead>
              <TableHead>Feedback Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRowsSkeleton />
            ) : (
              data?.calls.map((call) => {
                return (
                  <TableRow key={call.id}>
                    <TableCell>{call.id}</TableCell>
                    <TableCell>{call.timestamp}</TableCell>
                    <TableCell>{call.agentID}</TableCell>
                    <TableCell>{call.sentiment}</TableCell>
                    <TableCell className="text-right">{new Intl.NumberFormat().format(call.duration)}</TableCell>
                    <TableCell>{call.feedbackStatus}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
