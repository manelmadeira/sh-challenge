import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

interface PlayCallProps {
  isReady: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

export function PlayCall({ isReady, isPlaying, onClick }: PlayCallProps) {
  return (
    <div className="flex flex-col">
      <Button
        variant="outline"
        size="lg"
        className="cursor-pointer"
        onClick={onClick}
        disabled={!isReady}
      >
        {isPlaying ? (
          <>
            <IconPlayerPauseFilled /> Pause Call
          </>
        ) : (
          <>
            <IconPlayerPlayFilled /> {!isReady ? "Loading" : "Play Call"}
          </>
        )}
      </Button>
    </div>
  );
}
