import { useRef, useState } from "react";

import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import Retell from "retell-sdk";

import { Button } from "@/components/ui/button";

function useGetCall() {
  const client = new Retell({
    // just for the demo
    apiKey: "key_30c4c06debc881c00952a3625be3",
  });

  return async () => {
    const callResponse = await client.call.retrieve(
      // created one as an example
      "call_c26f23d3f9da0f2396bbde89f96"
    );

    return callResponse.recording_url;
  };
}

interface AudioState {
  src: string;
  isPlaying: boolean;
}

export function PlayCall() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const getCall = useGetCall();
  const [isLoading, setIsLoading] = useState(false);
  const [audioState, setAudioState] = useState<AudioState>({
    src: "",
    isPlaying: false,
  });

  function handleClick() {
    if (audioState.isPlaying) {
      audioRef.current?.pause();
      setAudioState((prev) => ({
        ...prev,
        isPlaying: false,
      }));
    } else if (!audioState.src) {
      setIsLoading(true);
      getCall().then((recording) => {
        if (recording) {
          setIsLoading(false);
          setAudioState({
            src: recording,
            isPlaying: true,
          });
        }
      });
    } else {
      audioRef.current?.play();
      setAudioState((prev) => ({
        ...prev,
        isPlaying: true,
      }));
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="cursor-pointer"
        onClick={handleClick}
        disabled={isLoading}
      >
        {audioState.isPlaying ? (
          <>
            <IconPlayerPauseFilled /> Pause Call
          </>
        ) : (
          <>
            <IconPlayerPlayFilled /> {isLoading ? "Loading" : "Play Call"}
          </>
        )}
      </Button>
      {audioState.src && (
        <audio ref={audioRef} id="audio" src={audioState.src} autoPlay onEnded={() => {
          setAudioState((prev) => ({
            ...prev,
            isPlaying: false
          }))
        }}></audio>
      )}
    </>
  );
}
