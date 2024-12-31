"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useRoom } from "@liveblocks/react/suspense";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import * as Y from "yjs";
import BlockNote from "./BlockNote";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  const darkModeButtonStyle = `hover:text-gray-700 ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300"
  } `;
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-end gap-2 mb-10">
        <TranslateDocument doc={doc} />
        <ChatToDocument doc={doc} />

        {/* dark mode */}
        <Button
          className={darkModeButtonStyle}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}
export default Editor;
