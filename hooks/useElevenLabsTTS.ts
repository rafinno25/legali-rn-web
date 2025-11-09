// Mobile-friendly placeholder for TTS. Integrate with expo-speech or ElevenLabs API later.
export function useElevenLabsTTS() {
  const speak = (text: string) => {
    console.log("[TTS]", text.slice(0, 80));
  };
  const stop = () => {
    console.log("[TTS] stop");
  };
  return { speak, stop } as const;
}