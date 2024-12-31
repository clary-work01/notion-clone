"use client";

import Document from "@/components/Document";

function DocumentPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Document id={id} />
    </div>
  );
}
export default DocumentPage;
