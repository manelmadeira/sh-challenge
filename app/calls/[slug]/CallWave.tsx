"use client";

import { useEffect, useRef } from "react";

import { useWavesurfer } from "@wavesurfer/react";

import { Skeleton } from "@/components/ui/skeleton";

interface CallWaveProps {
  src?: string;
  onReady: () => void;
  isPlaying: boolean;
}

export function CallWave({ src, onReady, isPlaying }: CallWaveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { wavesurfer, isReady } = useWavesurfer({
    container: containerRef,
    height: 150,
    waveColor: "var(--primary)",
    progressColor: "blue",
    cursorColor: "var(--muted-foreground)",
    barWidth: 3,
    barGap: 2,
  });

  useEffect(() => {
    if (src) {
      wavesurfer?.load(src);
    }
  }, [wavesurfer, src]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (isPlaying) {
      wavesurfer?.play();
    } else {
      wavesurfer?.pause();
    }
  }, [wavesurfer, isPlaying, isReady]);

  useEffect(() => {
    wavesurfer?.on("ready", () => {
      onReady();
    });
  }, [wavesurfer, onReady]);

  return (
    <div className="h-[150px] relative">
      <div ref={containerRef} />

      {(!isReady || !src) && (
        <Skeleton className="h-full w-full absolute top-0 left-0" />
      )}
    </div>
  );
}
