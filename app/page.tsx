import { CallsTable } from "@/components/CallsTable";
import { Header } from "@/components/Header";
import { SentimentMetrics } from "@/components/SentimentMetrics";
import { SentimentTrends } from "@/components/SentimentTrends";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col gap-3 p-3">
          <SentimentMetrics />
          <SentimentTrends />
          <CallsTable />
        </div>
      </main>
    </>
  );
}
