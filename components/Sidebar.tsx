"use client";

import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarOption from "./SidebarOption";
import { useGroupedData } from "@/lib/useGroupedData";

function Sidebar() {
  const { groupedData } = useGroupedData();

  const MenuOptions = () => {
    return (
      <>
        <NewDocumentButton />

        {/* my document list */}
        <div className="flex py-4 flex-col space-y-4 md:max-w-36">
          {groupedData.owner.length === 0 ? (
            <h2 className="text-gray-500 font-semibold text-sm">
              No documents found
            </h2>
          ) : (
            <>
              <h2 className="text-gray-500 font-semibold text-sm">
                My Documents
              </h2>
              {groupedData.owner.map((doc) => (
                <SidebarOption
                  key={doc.id}
                  id={doc.id}
                  href={`/doc/${doc.id}`}
                />
              ))}
            </>
          )}
          {/* documents shared with me list */}
          {groupedData.editor.length > 0 && (
            <>
              <h2 className="text-gray-500 font-semibold text-sm">
                Shared With Me
              </h2>
              {groupedData.editor.map((doc) => (
                <SidebarOption
                  key={doc.id}
                  id={doc.id}
                  href={`/doc/${doc.id}`}
                />
              ))}
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="p-2 md:p-5 bg-gray-200">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon size={40} className="rounded-lg hover:opacity-30" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                <MenuOptions />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block">
        <MenuOptions />
      </div>
    </div>
  );
}
export default Sidebar;
