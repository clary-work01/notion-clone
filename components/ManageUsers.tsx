import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import useOwner from "@/lib/useOwner";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { removeUserFromDocument } from "@/actions/actions";

function ManageUsers() {
  const { user } = useUser();
  const room = useRoom();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const isOwner = useOwner();
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );
  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!user) return;

      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success("User removed from room successfully!");
      } else {
        toast.error("Failed to remove user from room!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            Below is a list of users who have access to this
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2" />

        <div className="flex flex-col space-y-2">
          {usersInRoom?.docs.map((doc) => {
            const { userId, role } = doc.data();

            return (
              <div key={userId} className="flex items-center justify-between">
                <p className="font-light">
                  {userId === user?.emailAddresses[0].toString()
                    ? `${userId} (You) `
                    : userId}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline">{role}</Button>

                  {isOwner && userId !== user?.emailAddresses[0].toString() && (
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(userId)}
                      disabled={isPending}
                      size="sm"
                    >
                      {isPending ? "Removing..." : <Trash2Icon />}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ManageUsers;
