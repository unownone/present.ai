"use client";

import { useState } from "react";
import PPTContainer from "./components/PPTcontainer";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(
    undefined
  );
  return (
    <main className="flex w-full h-screen p-24 flex-col items-center content-center justify-between">
      <PPTContainer
        loading={loading}
        setLoading={setLoading}
        setLoadingMessage={setLoadingMessage}
        loadingMessage={loadingMessage}
      />
    </main>
  );
}
