"use client";
import * as Y from "yjs";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useSelf } from "@liveblocks/react/suspense";
import { stringToColor } from "@/lib/stringToColor";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

type BlockNoteProps = {
  doc: Y.Doc;
  provider: any;
  darkMode: boolean;
};
function BlockNote({ doc, provider, darkMode }: BlockNoteProps) {
  const userInfo = useSelf((me) => me.info);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo.name,
        color: stringToColor(userInfo.email),
      },
    },
  });
  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView
        editor={editor}
        className="min-h-screen"
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}
export default BlockNote;
