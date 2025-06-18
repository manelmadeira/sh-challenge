import Link from "next/link";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex justify-between shrink-0 items-center gap-2 py-2 px-4 border-b">
      <Button asChild variant="link" className="px-0">
        <Link href="/">
          <h1 className="text-base font-medium">AI Call Evaluator</h1>
        </Link>
      </Button>

      <ModeToggle />
    </header>
  );
}
