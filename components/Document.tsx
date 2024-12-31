"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDocTitle } from "@/lib/useDocTitle";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const isOwner = useOwner();
  const { docTitle, updateDocTitle, isUpdating } = useDocTitle(id);

  useEffect(() => {
    if (docTitle) {
      setInput(docTitle);
    }
  }, [docTitle]);

  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto pb-5 justify-between">
        <form
          onSubmit={(e) => updateDocTitle(e, input)}
          className="flex-1 flex space-x-2"
        >
          {/* update title */}
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {/* isOwner && invite user */}
          {/* isOwner && delete document  */}
          {isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        <ManageUsers />
        <Avatars />
      </div>

      <hr className="pb-10" />

      <Editor />
    </div>
  );
}
export default Document;
