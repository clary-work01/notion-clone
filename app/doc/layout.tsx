import LiveblocksProvider from "@/components/LiveblocksProvider";
import { ReactNode } from "react";

function AllDocumentsLayout({ children }: { children: ReactNode }) {
  return <LiveblocksProvider>{children}</LiveblocksProvider>;
}
export default AllDocumentsLayout;
