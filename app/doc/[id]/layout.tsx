import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

async function DocumentLayout({
  children,
  params: { id },
}: {
  children: ReactNode;
  params: { id: string };
}) {
  await auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
export default DocumentLayout;
