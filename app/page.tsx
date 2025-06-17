import { Header } from "@/components/Header";

import { SentimentMetrics } from "./SentimentMetrics";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col gap-2 p-3">
          <SentimentMetrics />
        </div>
      </main>
    </>
  );
}
