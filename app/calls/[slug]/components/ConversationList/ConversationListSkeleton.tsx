import { Skeleton } from "@/components/ui/skeleton";

const SKELETONS = new Array(3).fill(null);

export function ConversationlistSkeleton() {
  // these elements will be removed once the data loads
  // so index as key would be safe
  return SKELETONS.map((_, index) => (
    <div className="flex h-[150px]" key={index}>
      <Skeleton className="h-full w-full" />
    </div>
  ));
}
