"use client";

import { useEffect, useState } from "react";

import Retell from "retell-sdk";

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

export function useGetAudioCall() {
  const [audioSrc, setAudioSrc] = useState<string | undefined>();
  const getCall = useGetCall();

  useEffect(() => {
    if (!audioSrc) {
      getCall().then((src) => {
        setAudioSrc(src);
      });
    }
  }, [audioSrc, getCall]);

  return audioSrc;
}
