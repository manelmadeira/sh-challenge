import { ModeToggle } from "@/components/ModeToggle";

export function Header() {
  return (
    <header className="flex justify-between shrink-0 items-center gap-2 py-2 px-4 border-b">
      <h1 className="text-base font-medium">AI Call Evaluator</h1>

      <ModeToggle />
    </header>
  );
}
