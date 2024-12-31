"use client";

import { ReactNode } from "react";
import { LiveblocksProvider as LiveblocksProviderWrapper } from "@liveblocks/react/suspense";

function LiveblocksProvider({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
  }
  return (
    <LiveblocksProviderWrapper throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProviderWrapper>
  );
}
export default LiveblocksProvider;
