"use client";

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent, ReactNode } from "react";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: { children: ReactNode }) {
  const [, updateMyPresence] = useMyPresence();
  const othersPresence = useOthers();

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
    updateMyPresence({ cursor });
  };
  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {/* render others presence on the page */}
      {othersPresence
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => {
          return (
            <FollowPointer
              key={connectionId}
              info={info}
              x={presence.cursor!.x}
              y={presence.cursor!.y}
            />
          );
        })}
      {children}
    </div>
  );
}

export default LiveCursorProvider;
