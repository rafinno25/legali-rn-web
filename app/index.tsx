import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/auth";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const token = await getAccessToken();
      setAuthed(!!token);
      setReady(true);
    };
    void bootstrap();
  }, []);

  if (!ready) {
    return null; // Optionally render a splash/loading screen
  }

  return <Redirect href={authed ? "/(chats)" : "/(auth)/auth"} />;
}
